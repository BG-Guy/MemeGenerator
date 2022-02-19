'use strict'

var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}
const STORAGE_KEY = 'memeDB'
var gMemes = []
var gLine

var gLines =
{
    topLine: [
        `When You're bored`,
        'Going for a trip',
        'When you find out',
        `When you're finished`,
        `When everything goes well`,
        `The time is now`,
        `What if I told you`,
        `The day before`,
        `What if you are wrong`,
        `Brace yourselves`,
        `When you get home`,
        `When you forgot something`,
        `When everything works`,
    ],
    bottomLine: [
        `you're OK`,
        `exams are arriving`,
        `you have no idea`,
        `you don't care`,
        `it doesn't matter`,
        `it works`,
        `it doesn't work`,
        `you are late`,
        `there is no thini`,
        `there is no harif`,
        `there is no coffee`,
        `you have nothing to watch`
    ]
}

var gMeme = {
    id: '',
    memeURL: '',
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I sometimes eat Falafel', 
        size: 30,
        align: 'center',
        color: 'red',
        strokeColor: 'black',
        font: 'Impact',
        yCoord: 50,
        xCoord: 222,
        isFocus: false,
        isDrag: false
    }]
}

function getMeme() {

    return gMeme  
}

function getMemes() {
    var memes = loadFromStorage(STORAGE_KEY)
    gMemes = memes
    return memes
}

function getTextCoordX(txt) {
    var textLength = gCtx.measureText(txt) 
    var center = gElCanvasWidth / 2
    var textPosX = center
    return textPosX

}

function setLineTxt(txt) {
    var line = gMeme.lines[gMeme.selectedLineIdx]
    if (!txt.trim()) return
    line.xCoord = getTextCoordX(txt)
    line.txt = txt
    renderMeme()
    

}

function setColor(color) {
    var line = gMeme.lines[gMeme.selectedLineIdx]

    line.color = color
    renderMeme()

    
}

function setFont(fontOrStep) {
    var line = gMeme.lines[gMeme.selectedLineIdx]
    if (isNaN(fontOrStep)) line.font = fontOrStep
    else line.size += fontOrStep
    renderMeme()


    
}
 
function switchLines() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = -1
    gMeme.selectedLineIdx++
    var line = gMeme.lines[gMeme.selectedLineIdx]
    gElLineInput.value = line.txt
    gElSelectFontInput.value = line.font
}

function setAlignText(position) {
    var line = gMeme.lines[gMeme.selectedLineIdx]
    line.align = position
    if (position === 'right') line.xCoord = gElCanvasWidth - 10
    if (position === 'left') line.xCoord = 10
    if (position === 'center') line.xCoord = gElCanvasWidth / 2

    
    renderMeme()
}

function createLine(txt) {
    if (!txt.trim()) return
    if (gMeme.lines.length === 3) return
    return {
        txt: txt,
        size: 30,
        align: 'center',
        color: 'black',
        strokeColor: 'black',
        font: 'Impact',
        yCoord: gMeme.lines.length === 2 ? gElCanvasHeight / 2 : gElCanvasHeight - 50,
        xCoord: gElCanvasWidth/2,
        isFocus: false,
        isDrag: false
    }
}


function setFlexible() {
    var textColors = ['red', 'black', 'white']
    var lineNum = getRandomInt(1,3)
    var textSize = [25, 30, 35, 40, 45, 50]
    var textFont = ['Impact', 'Arial', 'Ubunoto']
    var strokeColor = textColors
    var texts 
    if (lineNum === 2 && gMeme.lines.length < 2) gMeme.lines.push(createLine('txt'))
    
    
    for (let i = 0; i < lineNum; i++) {
        if (i === 0) texts = gLines.topLine
        if (i === 1) texts = gLines.bottomLine

        let line = gMeme.lines[i] 
        line.txt = texts[getRandomInt(0, texts.length)]
        var maxSize = gCtx.measureText(line.txt) > 40 ? 0 : 6
        console.log(maxSize);
        line.xCoord = gElCanvasWidth/2
        line.yCoord = i === 0 ? 50 : gElCanvasHeight - 50
        line.strokeStyle = strokeColor[getRandomInt(0,strokeColor.length)]
        line.fillStyle = textColors[getRandomInt(0,textColors.length)]
        line.size = textSize[getRandomInt(0,maxSize)]
        line.font = textFont[getRandomInt(0,textFont.length)]
        
        
    }
    renderMeme()
}

function saveMeme(meme) {

    gMemes.push(meme)

    saveToStorage(STORAGE_KEY, gMemes)
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    return pos

    console.log(pos);
    // if (gTouchEvs.includes(ev.type)) {
    //     ev.preventDefault()
    //     ev = ev.changedTouches[0]
    //     pos = {
    //         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
    //         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
    //     }
    // }
    // return pos
}

function setLineToDrag(pos) {
    var meme = getMeme()
    var lines = meme.lines
    lines.forEach((line) => {
        let lineWidth = gCtx.measureText(line.txt).width + 30
        let lineStartCoordX = line.xCoord - lineWidth/2
        let lineEndCoordX = line.xCoord + lineWidth/2 
        let lineEndCoordY = line.yCoord + line.size
        let lineStartCoordY = line.yCoord - line.size
        //If clicked pos in range
        if (pos.x < lineEndCoordX && pos.x > lineStartCoordX
            && pos.y < lineEndCoordY && pos.y > lineStartCoordY) {
                line.isDrag = true
                line.isFocus = true
                document.body.style.cursor = 'grabbing'

                console.log(line.isDrag)
            }

    })
}

function moveLine(dx, dy) {
    var meme = getMeme()
    meme.lines.forEach((line) => {
        if (line.isDrag === true) {
            line.xCoord += dx
            line.yCoord += dy
            renderMeme()
        }
    })
}

function getLine() {
    if (gLine) return gLine
}

function disableDrag() {
    gMeme.lines.forEach((line) => {line.isDrag = false; console.log(line.isDrag)})
}

function isDrag() {
    return gMeme.lines.some((line) => line.isDrag)
}

