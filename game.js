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