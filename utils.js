//FUNCTIONS

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}


//EVENT LISTENERS

var elTextInput = document.querySelector('#text-line')
elTextInput.addEventListener("keyup", function(event) {
            elTextInput.click()
    })

var elSearchInput = document.querySelector('.search-bar-input')
elSearchInput.addEventListener('keyup', function() {
    setFilter(elSearchInput.value)
})



// ELEMENTS
const gElLineInput = document.querySelector('#text-line')
const gElSelectFontInput = document.querySelector('#set-font')
const gElMemeGenerator = document.querySelector('.meme-generator')
const gElGallery = document.querySelector('.gallery')
const gElMemeGalleryContainer = document.querySelector('.meme-gallery')
const elMenu = document.querySelector('.menu')
const elNavLinks = document.querySelector('.nav-links')
const elLinks = document.querySelectorAll('.nav-links li')


// ANIMATIONS

function expandSearchBar() {

    var elSearchBarInput = document.querySelector('.search-bar-input')
    if (elSearchBarInput.classList.contains('expand')) {
        elSearchBarInput.classList.remove('expand')
    }
    else elSearchBarInput.classList.add('expand')
    
}


    elMenu.addEventListener('click', () => {
        elNavLinks.classList.toggle('open')
    })

    elLinks.forEach((link) => {

    link.addEventListener('click', () => {
        elNavLinks.classList.toggle('open')
    })
})






  
  