'use strict'

let gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['trump', 'angry'] },
    { id: 2, url: 'img/2.jpg', keywords: ['dog', 'kiss'] },
    { id: 3, url: 'img/3.jpg', keywords: ['baby', 'cute'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat', 'cute'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'angry'] },
    { id: 6, url: 'img/6.jpg', keywords: ['man', 'funny'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby', 'surprize'] },
    { id: 8, url: 'img/8.jpg', keywords: ['man', 'funny'] },
    { id: 9, url: 'img/9.jpg', keywords: ['boy', 'funny'] },
    { id: 10, url: 'img/10.jpg', keywords: ['obama', 'funny'] },
    { id: 11, url: 'img/11.jpg', keywords: ['man', 'kiss'] },
    { id: 12, url: 'img/12.jpg', keywords: ['man', 'point'] },
    { id: 13, url: 'img/13.jpg', keywords: ['cat', 'cute'] },
    { id: 14, url: 'img/14.jpg', keywords: ['cat', 'cute'] },
    { id: 15, url: 'img/15.jpg', keywords: ['cat', 'cute'] },
    { id: 16, url: 'img/16.jpg', keywords: ['cat', 'cute'] },
    { id: 17, url: 'img/17.jpg', keywords: ['cat', 'cute'] },
    { id: 18, url: 'img/18.jpg', keywords: ['cat', 'cute'] },
]

function onInit() {
    renderGallery()
}

function renderGallery() {
    const elMainImgContainer = document.querySelector('.gallery-container')
    
    let strHtmls = gImgs.map(img =>`
    <img id="${img.id}" src="${img.url}" alt="${img.keywords}" title="${img.keywords}" onclick="onImgSelect(this)">    
    `)
    elMainImgContainer.innerHTML = strHtmls.join('')
}

function onImgSelect({id}){
    setImg(id)
    const elMainImgContainer = document.querySelector('.main-gallery-container')
    elMainImgContainer.style.display = 'none'


    onInitEditMeme()
}

function onFlexibleBtn(){
    setImg(getRandomInt(1,18))
    const elMainImgContainer = document.querySelector('.main-gallery-container')
    elMainImgContainer.style.display = 'none'
    onInitEditMeme()
}

function onGalleryClick(){
    const elMainImgContainer = document.querySelector('.main-gallery-container')
    elMainImgContainer.style.display = 'block'
    const elMemeEditorContainer = document.querySelector('.meme-editor-container')
    elMemeEditorContainer.style.display = 'none'
    const elSavedMemeContainer = document.querySelector('.main-saved-memes-container')
    elSavedMemeContainer.style.display = 'none'
}

function onInputSearch(value){
    const elMainImgContainer = document.querySelector('.gallery-container')
    const filtedImg = filter(value)

    let strHtmls = filtedImg.map(img =>`
    <img id="${img.id}" src="${img.url}" alt="${img.keywords}" title="${img.keywords}" onclick="onImgSelect(this)">    
    `)
    elMainImgContainer.innerHTML = strHtmls.join('')
}

function filter(value){
    return gImgs.filter(img =>
        img.keywords[0].includes(value) || img.keywords[1].includes(value))
}

function onClearCtn(){
    document.getElementById('filter-input').value = ''
    renderGallery()
}