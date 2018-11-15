//variables for storing time
let seconds = 0;
let minutes = 0;
let hours = 0;
let timeElapsed;

//variable for storing number of moves
let moves = 0;

//variable for storing number of cards matched
let matchList = 0;

//array to store list of opened cards
let openCards = [];

//disables additional card clicks while animation
let isAnimating = true;

//list of all cards
let cardStack = document.querySelectorAll('.card');

//array for list of all cards
let cardArray = [...cardStack];

//variable for moves count
let count = document.querySelector('.moves');

//variable for stars count
const starCount = document.querySelectorAll('.fa-star');

//vaiable for storing time
let timer = document.querySelector('.gameTimer');

//variable to store stars at the end of game
let endStar= document.querySelector('.rating');

//variable to store time at the end of game
let endTime = document.querySelector('.endTime');

//variable to store number of moves at the end of game
let endMoves = document.querySelector('.totalMoves');

//variable to store stars during the game
let starList = document.querySelector('.stars');

//variable to access modal class from index.html
let modalSelector = document.querySelector('.modal');

//variable to replay game after the game ends.
let replayButton = document.querySelector('.replay');
replayButton.onclick = displayCards;

//shuffles the cards during loading
document.body.onload = displayCards;

//variable to restart the game during the gameplay
let replayGame= document.querySelector('.restart');
replayGame.onclick = displayCards;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array){
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//function for displaying cards
function displayCards(){
    cardArray = shuffle(cardArray);
    let tempHolder= [];
    for (let i = 0; i < cardArray.length; i++) {
        tempHolder.forEach.call(cardArray, function(item){
    });
    cardArray[i].classList.remove( 'open', 'show', 'match', 'unmatched', 'disabled');
    }
    moves =0;
    matchList =0;
    count.innerHTML = 0;
    for (let i=0; i < starCount.length; i++){
       starCount[i].style.visibility = 'visible';
    }
    clearInterval(timeElapsed);
    hours = 0;
    minutes = 0;
    seconds = 0;
    timer.innerHTML = hours + ' h ' + minutes + ' m ' + seconds + ' s ';
    endStar.innerHTML = '';
    endMoves.innerHTML = '';
    endTime.innerHTML = '';
    openCards = [];
    isAnimating = false;
    modalSelector.classList.remove('show');
    gameTime();
 }

//function for opening and comparing the cards
let openCard = function(){
    if(isAnimating) return;
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
    openCards.push(this);
    let cardCount = openCards.length;
    if(cardCount === 2){
        movesCounter();
        if(openCards[0].firstElementChild.className === openCards[1].firstElementChild.className){
            matchList++;
            for (let i = 0; i < 2; i++){
                openCards[i].classList.add('match');
                openCards[i].classList.remove('show', 'open');
            }
            openCards = [];
        }else{
            notMatch();
        }
    }
    finished();
}

//function for flipping the cards back on mismatch
function notMatch(){
    isAnimating = true;
    for(let i = 0; i < 2; i++){
    openCards[i].classList.add('unmatched');
    }
    setTimeout(function(){
        isAnimating = false;
        for(let i = 0; i < openCards.length; i++){
            openCards[i].classList.remove('open', 'show', 'unmatched', 'disabled');
        }
        openCards = [];
    }, 1000);
}

//function for counting the number of moves
function movesCounter(){
    moves++;
    count.innerHTML = moves;
    if(moves < 20 && moves > 15){
        starCount[2].style.visibility = 'collapse';
    }else if(moves > 20){
        starCount[1].style.visibility = 'collapse';
    }
}

//functuion for counting time
function gameTime(){
    timeElapsed = setInterval(function(){
        timer.innerHTML = hours + ' h ' + minutes + ' m ' + seconds + ' s ';
        seconds ++;
        if(seconds == 60){
            minutes++;
            seconds = 0;
        }
        if(minutes == 60){
            hours++;
            minutes = 0;
        }
    }, 1000);
}

//funcion for the modal popup
function finished(){
    if (matchList === 8){
        clearInterval(timeElapsed);
        endTime.innerHTML = timer.innerHTML;
        endMoves.innerHTML = count.innerHTML;
        endStar.innerHTML = starList.innerHTML;
        modalSelector.classList.add('show');
    }
}

//adds event listener to the cards
for(let i=0; i <cardArray.length; i++){
    cardStack= cardArray[i];
    cardStack.addEventListener('click', openCard);
}