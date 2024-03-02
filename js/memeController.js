'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

let gElCanvas = document.querySelector('canvas')
let gCtx = gElCanvas.getContext('2d')

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

        meme.lines[0].txtLength = gCtx.measureText(meme.lines[0].txt).width
        console.log('meme.lines[0].txtLength:', meme.lines[0].txtLength)
        meme.lines[1].txtLength = gCtx.measureText(meme.lines[1].txt).width
        console.log('meme.lines[1].txtLength:', meme.lines[1].txtLength)

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

console.log('meme:', meme)
    if (!meme.selectedLineIdx) {
        let line = meme.lines[0]
        let { x, y } = line
        if (line.textAlign === 'left' && !line.isDeleted) {
            gCtx.strokeRect(x, y - line.size, line.txtLength, line.size)
            updatePosFirstLine(x, y - line.size)
        }
        if (line.textAlign === 'right' && !line.isDeleted) {
            gCtx.strokeRect(x - line.txtLength, y - line.size, line.txtLength, line.size)
            updatePosFirstLine(x - line.txtLength, y - line.size)
        }
        if (line.textAlign === 'center' && !line.isDeleted) {
            gCtx.strokeRect(x - line.txtLength / 2, y - line.size, line.txtLength, line.size)
            updatePosFirstLine(x - line.txtLength / 2, y - line.size)
        }
    } else if (meme.selectedLineIdx) {
        let line = meme.lines[1]
        let { x, y } = line
        if (line.textAlign === 'left' && !line.isDeleted) {
            gCtx.strokeRect(x, y - line.size, line.txtLength, line.size)
            updatePosSecondLine(x, y - line.size)

        }
        if (line.textAlign === 'right' && !line.isDeleted) {
            gCtx.strokeRect(x - line.txtLength, y - line.size, line.txtLength, line.size)
            updatePosSecondLine(x - line.txtLength, y - line.size)

        }
        if (line.textAlign === 'center' && !line.isDeleted) {
            gCtx.strokeRect(x - line.txtLength / 2, y - line.size, line.txtLength, line.size)
            updatePosSecondLine(x - line.txtLength / 2, y - line.size)

        }
    }
}


function onChangeText(txt) {
    changeText(txt)
    renderMeme()
}

function onChangeColor(color) {
    changeColor(color)
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
    renderMeme()
}

function onSwitchLineBtn() {
    const elInput = document.getElementById('text')
    elInput.value = switchLine()
    renderMeme()
}

function onMouseDown(ev) {

    let meme = getMeme()

    var { offsetX, offsetY } = ev

    const hoveredStar = meme.lines.find(line => {
        const { txtLength, size } = line
        const { x, y } = line.pos

        return offsetX >= x && offsetX <= x + txtLength &&
            offsetY >= y && offsetY <= y + size
    })


    if (hoveredStar) {
        if (meme.selectedLineIdx === hoveredStar.lindID) return
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
    renderMeme()
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