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
            isDeleted: false
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
            isDeleted: true
        }

    ]
}

function getMeme() {
    return gMeme
}

function changeText(txt) {
    return gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function changeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].colorFill = color
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    gMeme.selectedLineIdx = 0
    gMeme.lines[gMeme.selectedLineIdx].font = 'Impact'
    gMeme.lines[gMeme.selectedLineIdx].textAlign = 'left'
}

function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size++
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size--
}

function addLine() {
    if (!gMeme.lines[0].isDeleted && gMeme.lines[1].isDeleted) {
        gMeme.lines[1].isDeleted = false
        gMeme.selectedLineIdx = 1
    }else if(gMeme.lines[0].isDeleted && !gMeme.lines[1].isDeleted){
        gMeme.lines[0].isDeleted = false
        gMeme.selectedLineIdx = 0
    }else if(gMeme.lines[0].isDeleted && gMeme.lines[1].isDeleted){
        gMeme.lines[0].isDeleted = false
        gMeme.selectedLineIdx = 0
    }
}

function switchLine() {
    if (gMeme.lines[0].isDeleted || gMeme.lines[1].isDeleted ) return
    if (!gMeme.selectedLineIdx) gMeme.selectedLineIdx = 1
    else gMeme.selectedLineIdx = 0
    
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function alignText(value) {
    gMeme.lines[gMeme.selectedLineIdx].textAlign = value
}

function moveUp() {
    gMeme.lines[gMeme.selectedLineIdx].y--
}

function moveDown() {
    gMeme.lines[gMeme.selectedLineIdx].y++
}

function deleteLine() {
    gMeme.lines[gMeme.selectedLineIdx].isDeleted = true
}

function saveMene(){
    gMemes.push(gMeme)
    saveToStorage(STORAGE_KEY,gMemes )
}

function updatePosFirstLine(x,y){
    gMeme.lines[0].pos.x = x
    gMeme.lines[0].pos.y = y
}

function updatePosSecondLine(x,y){
    gMeme.lines[1].pos.x = x
    gMeme.lines[1].pos.y = y
}