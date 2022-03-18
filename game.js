// global vars
var brainEmoji = '🧠'
var numTiles = 20
var startTime = 30
var time = startTime
var intervalId
var score = 0

var countdownEl = document.getElementById('countdown')
var scoreEl = document.getElementById('score')
var tilesEl = document.getElementById('tiles')

var flippedTile1 = null
var flippedTile2 = null

// functions

function updateScore() {
  // make background green
  flippedTile1.classList.add('matched')
  flippedTile2.classList.add('matched')
  // increase score
  score++
  scoreEl.innerText = score
  // reset flippedTiles
  flippedTile1 = null
  flippedTile2 = null
}

function unFlipTiles() {
  // wait 1 second
  setTimeout(function() {
    // replace tile's number with brainEmoji
    flippedTile1.innerText = brainEmoji
    flippedTile2.innerText = brainEmoji
    // remove .flipped
    flippedTile1.classList.remove('flipped')
    flippedTile2.classList.remove('flipped')
    // reset flippedTiles
    flippedTile1 = null
    flippedTile2 = null
  }, 1000)
}

function compareTiles() {
  var num1 = flippedTile1.getAttribute('data-number')
  var num2 = flippedTile2.getAttribute('data-number')
  if (num1 === num2) {
    updateScore()
  } else {
    unFlipTiles()
  }
}

function handleTileClick(event) {
  if (flippedTile1 && flippedTile2) {
    return
  }
  var clickedTile = event.target
  var num = clickedTile.getAttribute('data-number')
  clickedTile.innerText = num
  clickedTile.classList.add('flipped')
  if (!flippedTile1) {
    flippedTile1 = clickedTile
  } else {
    // assign clicked LI into flippedTile2
    flippedTile2 = clickedTile
    // compare flippedTile1's data-number and flippedTile2's data-number
    compareTiles()
  }
}

function createShuffledNumbers() {
  var nums = []
  for (var i = 0; i < numTiles / 2; i++) {
    var randNum = Math.floor( Math.random() * 500 )
    nums.push(randNum, randNum)
  }
  nums = nums.sort(function() {
    return Math.random() - 0.5
  })
  return nums
}

function createTiles() {
  var shuffledNums = createShuffledNumbers()
  for (var i = 0; i < shuffledNums.length; i++) {
    var li = document.createElement('li')
    li.innerText = brainEmoji
    li.setAttribute('data-number', shuffledNums[i])
    li.classList.add('tile')
    li.addEventListener('click', handleTileClick)
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