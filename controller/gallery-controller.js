'use strict'

var gImgs


function init() {
    renderImgs()
}

function renderImgs() {
    var imgs = getImgs()
    gImgs = imgs
    var strHtmls = imgs.map((img) => {
        return `
        
            <img onclick="getImg(this)" class="img-preview" 
            height = "300" width = "300" id="img-${img.id}" src="${img.url}" alt="img ${img.id}">
        
        `
    })
    document.querySelector('.img-gallery').innerHTML = strHtmls.join('')

}

function getImg(el) {
    gCurrImgEl = el
    gElGallery.classList.add('hide')
    gElMemeGenerator.classList.remove('hide')

    renderMeme()
}

function showGallery() {
    if (!gElMemeGenerator.classList.contains('hide')) gElMemeGenerator.classList.add('hide')
    if (!gElMemeGalleryContainer.classList.contains('hide')) gElMemeGalleryContainer.classList.add('hide')
    gElGallery.classList.remove('hide')
}

function onFlexible() {
    var randNum = getRandomInt(0,gImgs.length)
    gCurrImgEl = document.querySelector(`#img-${randNum + 1}`)
    getImg(gCurrImgEl)
    setFlexible()

}

