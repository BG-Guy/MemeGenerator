'use strict'



function renderMemesGallery() {
    var memes = getMemes()
    console.log(memes);
    var HTMLstrs = []
    memes.map((meme) => {
        var HTMLstr = `
        <img src="${meme.memeURL}" alt="" class="meme" id="${meme.id}">
        `
        HTMLstrs.push(HTMLstr)
    })
    
    gElMemeGalleryContainer.innerHTML = HTMLstrs.join('')

}

function ShowMemesGallery() {
    gElMemeGalleryContainer.classList.remove('hide')
    if (!gElMemeGenerator.classList.contains('hide')) gElMemeGenerator.classList.add('hide')
    if (!gElGallery.classList.contains('hide')) gElGallery.classList.add('hide')
    renderMemesGallery()
}