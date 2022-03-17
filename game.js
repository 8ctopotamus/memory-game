var brainEmoji = '🧠'
var numTiles = 20

var tiles = document.getElementById('tiles')

function handleTileClick(e) {
  console.log('Tile clicked...')
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

function startRound() {
  createCards()
}

startRound()