const gameContainer = document.getElementById("game");
var counter = 0
var lastColor = ""
var lastIndexClicked = ""

var firstSelection = ""
var secondSelection = ""

if (localStorage.getItem('storedGuesses') === null) {
  localStorage.setItem('storedGuesses', 0)
  localStorage.setItem('storedMatches', 0)
}

if (localStorage.getItem('storedGuesses') === "") {
  localStorage.setItem('storedGuesses', 0)
  localStorage.setItem('storedMatches', 0)
}

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  
  var id_cnt = 0;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.setAttribute('color', color)
    newDiv.classList += 'inPlay'
      // newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    newDiv.id = id_cnt; id_cnt++
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function on() {
  document.getElementById("overlay").style.display = "block";
  console.log('div active');
  }

function off() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("overlay").className = "gameOverlay";
  console.log('div deactivated');
  document.querySelectorAll('.inPlay').forEach(function(el) {el.style.backgroundColor=""})

  firstSelection = ""
  secondSelection = ""
}


// TODO: Implement this function! HandleCardClick
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  console.log("its ID is: " + event.target.id);
  document.querySelector('.gameOverlayText').innerText = "nope."
  if (COLORS.indexOf(event.target.getAttribute('color'))>-1) {
    document.getElementById('countMoves').innerText++
  }
  if (document.getElementById('countMoves').innerText % 2 === 0) {
    console.log('this is even now')
        // increment Guesses regardless of outcome
        document.getElementById('countGuesses').innerText++
    on()


    setTimeout(off, 1000)
  }

  event.target.style.backgroundColor = event.target.getAttribute('color')

  // store variables for first and second selections
  if (firstSelection === "") {
    firstSelection = event.target.id
  }
  else {
    secondSelection = event.target.id
    console.log('1st:', firstSelection, '2nd:', secondSelection, ' these are the chosen ones')

    // Reset game if same box is clicked twice
    if (firstSelection === secondSelection) {
      alert('clicking the same box is not allowed')
      alert('the page will now refresh.')
      localStorage.clear()
      document.location.reload(true);
    }
    // increment match if matching
    console.log(document.getElementById(firstSelection).getAttribute('color') === document.getElementById(secondSelection).getAttribute('color'));
    if (document.getElementById(firstSelection).getAttribute('color') === document.getElementById(secondSelection).getAttribute('color')) {
      console.log('congratulations you made a match!')
      document.querySelector('.gameOverlayText').innerText = 'YAY! A Match!'
      document.getElementById('countMatches').innerText++
      document.getElementById(firstSelection).className = 'complete'
      document.getElementById(secondSelection).className = 'complete'
     // store high scores when game is complete

      if (document.getElementById('countMatches').innerText * 1 === COLORS.length / 2) {
        if (document.getElementById('countMatches').innerText / document.getElementById('countGuesses').innerText > parseInt(localStorage.getItem('storedMatches')) / parseInt(localStorage.getItem('storedGuesses'))) {
          console.log('if activated')
          localStorage.setItem('storedMatches', document.getElementById('countMatches').innerText);
          localStorage.setItem('storedGuesses', document.getElementById('countGuesses').innerText);
        }
        else if (localStorage.getItem('storedGuesses') === "0") {
          localStorage.setItem('storedMatches', document.getElementById('countMatches').innerText);
          localStorage.setItem('storedGuesses', document.getElementById('countGuesses').innerText);
        }
      }
    }

    // Store the lowest-scoring game in local storage, so that players can see a record of the best game played.
    // Update score section with values from localStorage
    document.getElementById('storedAccuracyRate').innerText = localStorage.getItem('storedMatches') / localStorage.getItem('storedGuesses');
    document.getElementById('storedGuesses').innerText = localStorage.getItem('storedGuesses')
    document.getElementById('storedMatches').innerText = localStorage.getItem('storedMatches')
    console.log(document.getElementById('storedGuesses'), document.getElementById('storedMatches'), document.getElementById('storedAccuracyRate').innerText)
}
}


// when the DOM loads
createDivsForColors(shuffledColors);
document.querySelector('#overlay').style.display = 'block'

document.getElementById('storedGuesses').innerText = localStorage.getItem('storedGuesses')
document.getElementById('storedMatches').innerText = localStorage.getItem('storedMatches')
document.getElementById('storedAccuracyRate').innerText = document.getElementById('storedMatches').innerText / document.getElementById('storedGuesses').innerText;

// Add a button that when clicked will start the game
document.querySelector('#startGameButton').addEventListener('click', function() {
   console.log('startGameButton clicked')
   document.querySelector('#startGameButton').style.display = 'none'
   document.querySelector('.gameOverlayText').style.display = 'block'
    off()
})

// Add a button that when clicked will restart the game once it has ended
document.querySelector('#buttonResetGame').addEventListener('click', function() {
  console.log('buttonResetGame clicked')
  document.location.reload(true);
})

// Button to reset local storage as well as the current game
document.querySelector('#buttonResetAll').addEventListener('click', function() {
  console.log('buttonResetAll clicked')
  localStorage.clear()
  document.location.reload(true);
})


// Potential Features:
// Allow for any number of cards to appear
// Instead of hard-coding colors, try something different like random colors or even images