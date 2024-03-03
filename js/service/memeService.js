'use strict'

const STORAGE_KEY = 'saved-memes'

const gMemes = []

let gMeme = {
    selectedImgId: 7,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'eat Falafel',
            font: 'Impact',
            size: 20,
            colorStroke: '#ffffff',
            colorFill: '#000000',
            textAlign: 'center',
            pos: { x: 200, y: 40 },
            x: 200,
            y: 40,
            txtLength: 0,
            lindID: 0,
            isDeleted: false,
            isDrag:false

        },
        {
            txt: 'sometimes',
            font: 'Impact',
            size: 20,
            colorStroke: '#ffffff',
            colorFill: '#000000',
            textAlign: 'center',
            pos: { x: 200, y: 350 },
            x: 200,
            y: 350,
            txtLength: 0,
            lindID: 1,
            isDeleted: true,
            isDrag:false
        }

    ]
}

function getMeme() {
    return gMeme
}

function changeText(txt) {
    if (gMeme.lines[gMeme.selectedLineIdx].isDeleted) return
    return gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function changeColor(color) {
    if (gMeme.lines[gMeme.selectedLineIdx].isDeleted) return
    gMeme.lines[gMeme.selectedLineIdx].colorFill = color
}

function borderTextColor(borderColor) {
    if (gMeme.lines[gMeme.selectedLineIdx].isDeleted) return
    gMeme.lines[gMeme.selectedLineIdx].colorStroke = borderColor
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    gMeme.selectedLineIdx = 0
    _restLine(0)
    _restLine(1)

}

function increaseFont() {
    if (gMeme.lines[gMeme.selectedLineIdx].isDeleted) return
    gMeme.lines[gMeme.selectedLineIdx].size++
}

function decreaseFont() {
    if (gMeme.lines[gMeme.selectedLineIdx].isDeleted) return
    gMeme.lines[gMeme.selectedLineIdx].size--
}

function addLine() {
    if (!gMeme.lines[0].isDeleted && gMeme.lines[1].isDeleted) {
        gMeme.lines[1].isDeleted = false
        gMeme.selectedLineIdx = 1
    } else if (gMeme.lines[0].isDeleted && !gMeme.lines[1].isDeleted) {
        gMeme.lines[0].isDeleted = false
        gMeme.selectedLineIdx = 0
    } else if (gMeme.lines[0].isDeleted && gMeme.lines[1].isDeleted) {
        gMeme.lines[0].isDeleted = false
        gMeme.selectedLineIdx = 0
    }
}

function switchLine() {

    if (!gMeme.lines[0].isDeleted && !gMeme.lines[1].isDeleted) {
        gMeme.selectedLineIdx = (!gMeme.selectedLineIdx)? 1 : 0
    }

    if (gMeme.lines[0].isDeleted && !gMeme.lines[1].isDeleted) {
        gMeme.selectedLineIdx = 1
    }

    if (!gMeme.lines[0].isDeleted && gMeme.lines[1].isDeleted) {
        gMeme.selectedLineIdx = 0
    }

    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function setFont(font) {
    if (gMeme.lines[gMeme.selectedLineIdx].isDeleted) return
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function alignText(value) {
    if (gMeme.lines[gMeme.selectedLineIdx].isDeleted) return
    gMeme.lines[gMeme.selectedLineIdx].textAlign = value
}

function moveUp() {
    if (gMeme.lines[gMeme.selectedLineIdx].isDeleted) return
    gMeme.lines[gMeme.selectedLineIdx].y--
}

function moveDown() {
    if (gMeme.lines[gMeme.selectedLineIdx].isDeleted) return
    gMeme.lines[gMeme.selectedLineIdx].y++
}

function deleteLine() {
    if (gMeme.lines[gMeme.selectedLineIdx].isDeleted) return
    gMeme.lines[gMeme.selectedLineIdx].isDeleted = true
    console.log('gMeme.selectedLineIdx:', gMeme.selectedLineIdx)
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx) ? 0 : 1
    console.log('gMeme.selectedLineIdx:', gMeme.selectedLineIdx)
}

function saveMene() {
    gMemes.push(gMeme)
    saveToStorage(STORAGE_KEY, gMemes)
}

function updatePosFirstLine(x, y) {
    gMeme.lines[0].pos.x = x
    gMeme.lines[0].pos.y = y
}

function updatePosSecondLine(x, y) {
    gMeme.lines[1].pos.x = x
    gMeme.lines[1].pos.y = y
}

function setTextDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveText(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].x +=dx
    gMeme.lines[gMeme.selectedLineIdx].y +=dy
}

function _restLine(idx) {

    gMeme.lines[idx].txt = (idx) ? 'eat Falafel' : 'sometimes'
    gMeme.lines[idx].size = 20
    gMeme.lines[idx].font = 'impact'
    gMeme.lines[idx].colorFill = '#FFFFFF'
    gMeme.lines[idx].colorStroke = '#000000'
    gMeme.lines[idx].textAlign = 'center'
    gMeme.lines[idx].isDeleted = (idx) ? true : false
    gMeme.lines[idx].pos = { x: 220, y: (idx) ? 350 : 40 }
    gMeme.lines[idx].x = 200
    gMeme.lines[idx].y = (idx) ? 350 : 40
    gMeme.lines[idx].txtLength = 0

}
