// global vars
var brainEmoji = '🧠'
var numTiles = 20
var startTime = 30
var time = startTime
var intervalId

var countdownEl = document.getElementById('countdown')
var scoreEl = document.getElementById('score')
var tilesEl = document.getElementById('tiles')

// functions
function handleTileClick() {
  console.log('Tile clicked')
}

function createTiles() {
  console.log('Creating tiles...')
  
  for (var i = 0; i < numTiles; i++) {
    var li = document.createElement('li')
    li.innerText = brainEmoji
    li.setAttribute('data-number', 2)
    li.classList.add('tile')
    li.addEventListener('click', handleTileClick)
    console.log(li)
    tilesEl.appendChild(li)
  }
}

function startTimer() {
  console.log('Starting timer...')
}

function startRound() {
  createTiles()
  startTimer()
}

// main process
startRound()