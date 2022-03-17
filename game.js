var brainEmoji = '🧠'
var numTiles = 20
var startTime = 30
var score = 0
var time = startTime
var intervalId

var tiles = document.getElementById('tiles')
var countdownEl = document.getElementById('countdown')
var scoreEl = document.getElementById('score')

var flippedTile1 = null
var flippedTile2 = null

function updateScore() {
  score++
  scoreEl.innerText = score
  flippedTile1.classList.add('matched')
  flippedTile2.classList.add('matched')
  flippedTile1 = null
  flippedTile2 = null
}

function unflipTiles() {
  setTimeout(() => {
    flippedTile1.innerText = brainEmoji
    flippedTile2.innerText = brainEmoji
    flippedTile1.classList.remove('flipped')
    flippedTile2.classList.remove('flipped')
    flippedTile1 = null
    flippedTile2 = null
  }, 2000)
}

function compareTiles() {
  var num1 = parseInt(flippedTile1.getAttribute('data-number'))
  var num2 = parseInt(flippedTile2.getAttribute('data-number'))
  console.log('Comparing', num1, num2)
  if (num1 === num2) {
    updateScore()
  } else {
    unflipTiles()
  }
}

function handleTileClick(e) {
  if (flippedTile1 && flippedTile2)
    return

  var tile = e.target
  var num = tile.getAttribute('data-number')
  tile.classList.add('flipped')
  tile.innerText = num  
  if (!flippedTile1) {
    flippedTile1 = tile
  } else {
    flippedTile2 = tile
    compareTiles(flippedTile1, flippedTile2)
  }
}

function createShuffledNums() {
  // create the array
  var nums = []
  for (var i = 0; i < numTiles/2; i++) {
    var randNum = Math.floor(Math.random() * 500)
    nums.push(randNum, randNum)
  }
  // shuffle it: https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html
  nums = nums.sort(() => Math.random() - 0.5)
  return nums
}

function createCards() {
  tiles.innerHTML = ''
  // need an array of rand numbers w dups
  var shuffledNums = createShuffledNums()
  for (var i = 0; i < shuffledNums.length; i++) {
    var tile = document.createElement('li')
    tile.classList.add('tile')
    tile.innerHTML = brainEmoji
    tile.setAttribute('data-number', shuffledNums[i])
    tile.addEventListener('click', handleTileClick)
    tiles.appendChild(tile)
  }  
}

function gameOver() {
  clearInterval(intervalId)
  var initials = prompt('Game over! Initials pls')
  const champ = JSON.parse(localStorage.getItem('memoryGameChamp'))
  if (!champ || champ.score < score) {
    localStorage.setItem('memoryGameChamp', JSON.stringify({
      initials,
      score
    }))
  }

  // TODO save score
  var playAgain = confirm('Want to play again?')
  if (playAgain) {
    window.location.reload()
  }
}

function startTimer() {
  clearInterval(intervalId)
  intervalId = setInterval(function() {
    time--
    countdownEl.innerText = time
    if (time === 0) {
      gameOver()
    }
  }, 1000)
}

function startRound() {
  createCards()
  startTimer()
}

startRound()