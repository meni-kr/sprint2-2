'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

let gElCanvas = document.querySelector('canvas')
let gCtx = gElCanvas.getContext('2d')

let gStartPos

function onInitEditMeme() {
    document.getElementById('text').value = ""
    document.getElementById('color').value = "#ffffff"
    document.getElementById('border-color').value = "#000000"
    document.querySelector('.font-list').value = ''
    document.querySelector('.text-align-list').value = ''
    addListeners()
    renderMeme()
}

function renderMeme() {
    const elSavedMemeContainer = document.querySelector('.main-saved-memes-container')
    elSavedMemeContainer.style.display = 'none'
    const elMemeEditorContainer = document.querySelector('.meme-editor-container')
    elMemeEditorContainer.style.display = 'flex'

    let meme = getMeme()

    const elImg = new Image()
    elImg.src = `img/${meme.selectedImgId}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        drawText(meme)

        meme.lines[meme.selectedLineIdx].txtLength = gCtx.measureText(meme.lines[meme.selectedLineIdx].txt).width

        drawRect(meme)
    }
}

function drawText(meme) {
    if (!meme.lines[0].isDeleted) {
        gCtx.beginPath()

        gCtx.lineWidth = 2
        gCtx.strokeStyle = `${meme.lines[0].colorStroke}`
        gCtx.fillStyle = `${meme.lines[0].colorFill}`
        gCtx.font = `${meme.lines[0].size}px ${meme.lines[0].font}`
        gCtx.textAlign = meme.lines[0].textAlign

        gCtx.fillText(meme.lines[0].txt, meme.lines[0].x, meme.lines[0].y)
        gCtx.strokeText(meme.lines[0].txt, meme.lines[0].x, meme.lines[0].y)

        gCtx.closePath()
    }

    if (!meme.lines[1].isDeleted) {
        gCtx.beginPath()

        gCtx.lineWidth = 2
        gCtx.strokeStyle = `${meme.lines[1].colorStroke}`
        gCtx.fillStyle = `${meme.lines[1].colorFill}`
        gCtx.font = `${meme.lines[1].size}px ${meme.lines[1].font}`
        gCtx.textAlign = meme.lines[1].textAlign

        gCtx.fillText(meme.lines[1].txt, meme.lines[1].x, meme.lines[1].y)
        gCtx.strokeText(meme.lines[1].txt, meme.lines[1].x, meme.lines[1].y)

        gCtx.closePath()
    }
}

function drawRect(meme) {


    if (!meme.selectedLineIdx) {
        let line = meme.lines[0]
        let { x, y } = line
        if (line.textAlign === 'left' && !line.isDeleted) {
            gCtx.strokeStyle = '#ffffff'

            gCtx.strokeRect(x - 10, y - line.size, (line.size * 4.2) + 30, line.size + 5)
            updatePosFirstLine(x, y - line.size)
        }
        if (line.textAlign === 'right' && !line.isDeleted) {
            gCtx.strokeStyle = '#ffffff'
            gCtx.strokeRect(x - line.txtLength - 10, y - line.size, line.txtLength + 20, line.size + 5)
            updatePosFirstLine(x - line.txtLength, y - line.size)
        }
        if (line.textAlign === 'center' && !line.isDeleted) {
            gCtx.strokeStyle = '#ffffff'
            gCtx.strokeRect(x - (line.txtLength / 2) - 10, y - line.size, line.txtLength + 20, line.size + 5)
            updatePosFirstLine(x - line.txtLength / 2, y - line.size)
        }
    }
    if (meme.selectedLineIdx) {
        let line = meme.lines[1]
        let { x, y } = line
        if (line.textAlign === 'left' && !line.isDeleted) {
            gCtx.strokeStyle = '#ffffff'
            gCtx.strokeRect(x - 10, y - line.size, line.txtLength + 20, line.size + 5)
            updatePosSecondLine(x, y - line.size)

        }
        if (line.textAlign === 'right' && !line.isDeleted) {
            gCtx.strokeStyle = '#ffffff'
            gCtx.strokeRect(x - line.txtLength - 10, y - line.size, line.txtLength + 20, line.size + 5)
            updatePosSecondLine(x - line.txtLength, y - line.size)

        }
        if (line.textAlign === 'center' && !line.isDeleted) {
            gCtx.strokeStyle = '#ffffff'
            gCtx.strokeRect(x - (line.txtLength / 2) - 10, y - line.size, line.txtLength + 20, line.size + 5)
            updatePosSecondLine(x - line.txtLength / 2, y - line.size)

        }
    }
}

function onChangeText(txt) {
    changeText(txt)
    renderMeme()
}

function onChangeTextColor(color) {
    changeColor(color)
    renderMeme()
}

function onChangeBorderTextColor(borderColor) {
    borderTextColor(borderColor)
    renderMeme()
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
    renderMeme()
}

function onIncreaseFontBtn() {
    increaseFont()
    renderMeme()
}

function onDecreaseFontBtn() {
    decreaseFont()
    renderMeme()
}

function onAddLineBtn() {
    addLine()
    const meme = getMeme()
    const lestColor = meme.lines[meme.selectedLineIdx].colorFill
    const lestColorStroke = meme.lines[meme.selectedLineIdx].colorStroke
    document.getElementById('color').value = lestColor
    document.getElementById('border-color').value = lestColorStroke
    document.querySelector('.font-list').value = ''
    document.querySelector('.text-align-list').value = meme.lines[meme.selectedLineIdx].textAlign
    renderMeme()
}

function onSwitchLineBtn() {

    const elInput = document.getElementById('text')
    elInput.value = switchLine()
    const meme = getMeme()

    const lestColor = meme.lines[meme.selectedLineIdx].colorFill
    const lestColorStroke = meme.lines[meme.selectedLineIdx].colorStroke
    document.getElementById('color').value = lestColor
    document.getElementById('border-color').value = lestColorStroke
    document.querySelector('.font-list').value = ''
    document.querySelector('.text-align-list').value = meme.lines[meme.selectedLineIdx].textAlign


    renderMeme()
}

function onMouseDown(ev) {

    let meme = getMeme()
    var { offsetX, offsetY } = ev

    const hovered = meme.lines.find(line => {
        if (line.isDeleted) return
        const { txtLength, size } = line
        const { x, y } = line.pos
        return offsetX >= x && offsetX <= x + txtLength &&
            offsetY >= y && offsetY <= y + size
    })

    if (hovered) {
        if (meme.selectedLineIdx === hovered.lindID) return
        onSwitchLineBtn()
    }
}

function onSetFont(font) {
    setFont(font)
    renderMeme()
}

function onAlignText(value) {
    alignText(value)
    renderMeme()
}

function onMoveUpBtn() {
    moveUp()
    renderMeme()
}

function onMoveDownBtn() {
    moveDown()
    renderMeme()
}

function onDeleteLineBtn() {
    deleteLine()
    onSwitchLineBtn()
}

function onSaveMemeBtn() {
    saveMene()
}

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    let meme = getMeme()
    gStartPos = getEvPos(ev)        
    const { x: offsetX, y: offsetY } = gStartPos
    const hovered = meme.lines.find(line => {
        if (line.isDeleted) return
        const { txtLength, size } = line
        const { x, y } = line.pos
        return offsetX >= x && offsetX <= x + txtLength &&
            offsetY >= y && offsetY <= y + size
    })

    if (!hovered) return

    setTextDrag(true)
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const meme = getMeme()
    const { isDrag } = meme.lines[meme.selectedLineIdx]
    if (!isDrag) return

    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveText(dx, dy)

    gStartPos = pos
    renderMeme()
}

function onUp() {
    setTextDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVENTS.includes(ev.type)) {

        ev.preventDefault()        
        ev = ev.changedTouches[0]   

        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData()
    formData.append('img', imgDataUrl)

    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {

        if (XHR.readyState !== XMLHttpRequest.DONE) return

        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR

        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}
