// cardApp object for namespacing
const cardApp = {};

// variables for initial scores
cardApp.playerScore = 0;
cardApp.computerScore = 0;

// variable for max score
cardApp.maxScore = 5;

// variable for API url
cardApp.url = 'https://deckofcardsapi.com/api/deck/new/draw/?count=2';

// init function
cardApp.init = function(){

    // Display score for player and computer
    $('.playerScore').html(`<p>Player Score: ${cardApp.playerScore}</p>`);
    $('.computerScore').html(`<p>Computer Score: ${cardApp.computerScore}</p>`);
    
    $('.draw').on('click', function(){
        // Make API request to access cards -> https://deckofcardsapi.com/
        // Randomly generate 2 cards: one for player, one for computer
        cardApp.askForCard = $.ajax({
            url: cardApp.url, 
            method: 'GET',
            dataType: 'json'
        }).then((result) => {
            
            // assign a weight (number) to the cards to be able to compare them
            for (let i=0; i<result.cards.length; i++) {
                if(result.cards[i].value === '2') {
                    result.cards[i].weight = 1;
                } else if (result.cards[i].value === '3'){
                    result.cards[i].weight = 2;
                } else if (result.cards[i].value === '4') {
                    result.cards[i].weight = 3;
                } else if (result.cards[i].value === '5') {
                    result.cards[i].weight = 4;
                } else if (result.cards[i].value === '6') {
                    result.cards[i].weight = 5;
                } else if (result.cards[i].value === '7') {
                    result.cards[i].weight = 6;
                } else if (result.cards[i].value === '8') {
                    result.cards[i].weight = 7;
                } else if (result.cards[i].value === '9') {
                    result.cards[i].weight = 8;
                } else if (result.cards[i].value === '10') {
                    result.cards[i].weight = 9;
                } else if (result.cards[i].value === 'JACK') {
                    result.cards[i].weight = 10;
                } else if (result.cards[i].value === 'QUEEN') {
                    result.cards[i].weight = 11;
                } else if (result.cards[i].value === 'KING') {
                    result.cards[i].weight = 12;
                } else if (result.cards[i].value === 'ACE') {
                    result.cards[i].weight = 13;
                }
            }

            console.log(result.cards);

            // function to set both scores to 0 at the end of the game
            // solves the problem if user clicks back from the end page 
            const setInitialScore = () => {
                cardApp.playerScore = 0;
                cardApp.computerScore = 0;
                $('.playerScore').html(`<p>Player Score: ${cardApp.playerScore}</p>`);
                $('.computerScore').html(`<p>Computer Score: ${cardApp.computerScore}</p>`);
            }

            // Check for winning score
            const checkForWin = () => {
                setTimeout(function() {
                    if (cardApp.playerScore === cardApp.maxScore) {
                        setInitialScore();
                        window.location.href = './winPage.html';
                    } else if (cardApp.computerScore === cardApp.maxScore) {
                        setInitialScore();
                        window.location.href = './losePage.html'
                    }
                }, 1000)
            }

            // Evaluate which card is higher and disply the result
            // update the score
            if (result.cards[0].weight > result.cards[1].weight) {
                setTimeout(function() {
                    cardApp.playerScore += 1;
                    $('.playerScore').html(`<p>Player Score: ${cardApp.playerScore}</p>`);
                    checkForWin();
                }, 1500)
            } else if (result.cards[0].weight < result.cards[1].weight) {
                setTimeout(function() {
                    cardApp.computerScore += 1;
                    $('.computerScore').html(`<p>Computer Score: ${cardApp.computerScore}</p>`);
                    checkForWin();
                }, 2000)
            }

            // user clicks "draw" -> displays player's card -> reveal computer's card
            let playerCardImage = $('<img>').attr('src', result.cards[0].image).attr('alt', `Playing card: ${result.cards[0].value} of ${result.cards[0].suit}`);
            let computerCardImage = $('<img>').attr('src', result.cards[1].image).attr('alt', `Playing card: ${result.cards[1].value} of ${result.cards[1].suit}`);
            
            $('.playerFlip').removeClass('cardInner');
            $('.playerCard .cardBack').empty().html(`<img src="./assets/pirateCard.jpg">`);
            setTimeout(function(){
                $('.playerCard .cardBack').html(playerCardImage);
                $('.playerFlip').addClass('cardInner');
            }, 500)
            
            $('.computerFlip').removeClass('cardInner');
            $('.computerCard .cardBack').empty().html(`<img src="./assets/pirateCard.jpg">`);
            setTimeout(function(){
                $('.computerCard .cardBack').html(computerCardImage);
                $('.computerFlip').addClass('cardInner');
            }, 1000)
        })
    })
    
    // other buttons functionality
    $('.home').on('click', function() {
        window.location.href = './index.html';
    })
    
    // User clicks "start game" button -> links to game page html
    $('.start').on('click', function() {
        window.location.href = './gamePage.html';
    })
    
};

$(function(){
    cardApp.init();
});