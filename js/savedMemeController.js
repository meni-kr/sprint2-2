'use strict'



function onSavedMemesClick(){
    const elMainImgContainer = document.querySelector('.main-gallery-container')
    elMainImgContainer.style.display = 'none'
    const elMemeEditorContainer = document.querySelector('.meme-editor-container')
    elMemeEditorContainer.style.display = 'none'
    const elSavedMemeContainer = document.querySelector('.main-saved-memes-container')
    elSavedMemeContainer.style.display = 'block'
    renderSavedMemes()
}

function renderSavedMemes() {
    const savedMemes = loadFromStorage('saved-memes')
    const elMainImgContainer = document.querySelector('.saved-memes-container')
    console.log('savedMemes.:', savedMemes)
    let strHtmls = savedMemes.map(meme =>`
    <img id="${meme.selectedImgId}" src="/img/${meme.selectedImgId}.jpg" onclick="onImgEditSelect(this)">   
    `)
    elMainImgContainer.innerHTML = strHtmls.join('')
}