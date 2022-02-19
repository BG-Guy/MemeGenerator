'use strict'

var gCurrImgEl
var gElCanvas
var gElCanvasWidth
var gElCanvasHeight
var gCtx
var gStartPos



function renderMeme() {
    
    createCanvas()
    resizeCanvas()
    addListeners()

    gCtx.drawImage(gCurrImgEl, 0, 0, gElCanvasWidth, gElCanvasHeight);
    
    var meme = getMeme()
    
    meme.lines.forEach((line) => {
        gCtx.strokeStyle = line.strokeColor;
        gCtx.fillStyle = line.color;
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.textAlign = line.align
        gCtx.fillText(line.txt, line.xCoord, line.yCoord);
        gCtx.strokeText(line.txt, line.xCoord, line.yCoord);

    })
}

function createCanvas() {
    gElCanvas = document.querySelector('#meme-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function resizeCanvas() {
    var elCanvasContainer = document.querySelector('.canvas')
    gElCanvasWidth = elCanvasContainer.offsetWidth
    gElCanvasHeight = elCanvasContainer.offsetHeight

}

function onEditLine() {
    let txt = gElLineInput.value
    setLineTxt(txt)

}

function onAddLine() {
    if (!gElLineInput.value.trim()) return
    var line = createLine(gElLineInput.value)
    gMeme.lines.push(line)
    renderMeme()
    gElLineInput.value = ''
    console.log(line);
}

function onSetFont(font) {
    setFont(font)
    
}

function onSwitchLines() {
    switchLines()
}

function onSetColor(color) {    
    setColor(color)
}


function onStepFont(step) {
    setFont(step)
}

function onAlignText(position) {
    setAlignText(position)
}

function onSaveMeme() {
    var memeURL = gElCanvas.toDataURL(`meme/jpg`)
    var meme = getMeme()
    meme.id = makeId()
    meme.memeURL = memeURL
    saveMeme(meme)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    var pos = getEvPos(ev)
    setLineToDrag(pos)
    console.log('onDown()');
    // if (!isCircleClicked(pos)) return
    // setCircleDrag(true)
    gStartPos = pos

}

function onMove(ev) {
    if (isDrag()) {
        var pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos

    }
    

    }


function onUp() {
    console.log('onUp()');
    disableDrag()
    document.body.style.cursor = 'grab'
}

