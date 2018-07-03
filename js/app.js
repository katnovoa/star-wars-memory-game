//Create a list that holds all of your cards
let allCards = ["swg swg-r2d2-o swg-3x", "swg swg-r2d2-o swg-3x", "swg swg-c3po-o swg-3x", "swg swg-c3po-o swg-3x",
  "swg swg-darthvader-o swg-3x", "swg swg-darthvader-o swg-3x", "swg swg-porg-8 swg-3x", "swg swg-porg-8 swg-3x", "swg swg-bb8 swg-3x", "swg swg-bb8 swg-3x",
  "swg swg-leia swg-3x", "swg swg-leia swg-3x", "swg swg-starwars swg-3x", "swg swg-starwars swg-3x", "swg swg-deathstar-o swg-3x", "swg swg-deathstar-o swg-3x"
];


const startDeck = document.querySelector('.deck');
const restart = document.querySelector('.restart');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;

  }

  return array;
}

//Shuffle the cards Array
shuffle(allCards);

/*
 * Deal cards
 */
function deal() {
    for(let i = 0; i < allCards.length; i++) {
        const li = document.createElement('li');
        li.classList.add('card');
        li.innerHTML = `<i class="${allCards[i]}"></i>`;
        startDeck.appendChild(li);

    }
}
 deal();
 restartGame();

 /*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 //Get a list of all the cards (from current layout)
const cardList = document.querySelectorAll('.card')
//Convert DOM List of cards to Array
const cardListArray = Array.from(cardList);
//Make an Array to hold the open cards
let openCards = [];
let matchedCards = [];
//start move counter
let moves = 0;
const movesNumber = document.querySelector('.moves');
//get stars
const stars = document.querySelector('.stars');

//keeping time
let timer;
let min = 0;
let sec = 0;
const time = document.querySelector('.timer-output');
let runTime = false;
const clock = '<i class="fa fa-clock-o"></i>';

//modal
const modal = document.querySelector('.modal-back');
const totalPairs = 16;



//flips cards to show icons
 startDeck.addEventListener('click', element => {
   const target = element.target;
   if (
     target.classList.contains('card') &&
     openCards.length < 2 &&
     !openCards.includes(target)
   ) {
     target.classList.add('open');
     target.classList.add('show');
     addCard(target);
     if (openCards.length == 2) {
       match();
       moveCounter();
       console.log("card flipped");
     }
    }
    startTimer();
 });

 //add the open cards to the empty array
 function addCard(target){
   openCards.push(target);
 }

 // Check for match
 function match() {
   if (openCards[0].innerHTML == openCards[1].innerHTML) {
     openCards[0].classList.add('match');
     openCards[1].classList.add('match');
     matchedCards.push(openCards[0]);
     matchedCards.push(openCards[1]);
     openCards = [];
   } else {
     openCards.forEach(card => {
       setTimeout(() => {
         card.classList.add('no-match');
       }, 400);

       setTimeout(() => {
         card.classList.remove('open', 'show', 'no-match');
       }, 1000);

       openCards = [];
     });
   }
   win();
 }

 // Restart the game
 function restartGame() {
   restart.addEventListener('click', () => {
     reset();
   });
 }


// Move counter
function moveCounter() {
  moves++;
  movesNumber.innerHTML = moves;
  ratingStars();
  return moves;
}

// Game star ratings
function ratingStars() {
  switch (moves) {
    case 10:
      stars.innerHTML = `<li><i class="fa fa-star"></i></li>
                         <li><i class="fa fa-star"></i></li>
                         <li><i class="fa fa-star"></i></li>`;
      break;
    case 15:
      stars.innerHTML = `<li><i class="fa fa-star"></i></li>
                         <li><i class="fa fa-star"></i></li>`;
      break;
    case 25:
      stars.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  }
}


// Timer
function startTimer() {
  if (runTime == false) {
    timer = setInterval(insertTime, 1000);
    runTime = true;
  } else {
    return;
  }
}

function insertTime() {
  sec++;
  if (sec < 10) {
    sec = `0${sec}`;
  }
  if (sec >= 60) {
    min++;
    sec = '00';
  }
  time.innerHTML = `<p>${min} : ${sec} ${clock}</p>`;
}

function stopTimer() {
  clearInterval(timer);
  sec = 0;
  min = 0;
  runTime = false;
  time.innerHTML = `<p>0 : 00</p>`;
}

// Star count
function getStarCount() {
  const currentStars = document.querySelectorAll('.stars li');
  let starCount = 0;
  for (const star of currentStars) {
    if (star.style.display !== 'none') {
      starCount++;
    }
  }
  return starCount;
}

// Modal window game results after wining game
function modalStats() {
  setTimeout(() => {
    const clockTime = document.querySelector('.timer-output').innerHTML;
    const modalTime = document.querySelector('.modal-time');
    const currentMove = moveCounter();
    const modalMoves = document.querySelector('.modal-moves');
    const currentStars = getStarCount();
    const modalStars = document.querySelector('.modal-stars');
    modalTime.innerHTML = `${clockTime}`;
    modalMoves.innerHTML = `Moves: ${currentMove}`;
    modalStars.innerHTML = `Stars: ${currentStars}`;
  }, 0);
}

// Check win and display modal window
function win() {
  if (matchedCards.length == totalPairs) {
    clearInterval(timer);
    modalStats();
    return modal.classList.toggle('hide');
  }
}

document.querySelector('.modal-replay').addEventListener('click', () => {
  modal.classList.toggle('hide');
  reset();
});


// Reset game
function reset() {
  startDeck.innerHTML = '';
  stopTimer();
  shuffle(allCards);
  deal();
  matchedCards = [];
  moves = 0;
  movesNumber.innerHTML = 0;
  stars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
}
