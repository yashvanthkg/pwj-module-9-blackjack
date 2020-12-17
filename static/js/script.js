//challenge 1: Your Age in days
function ageInDays(){

    var birthYear = prompt("Enter your age")
    var totalDays = (2020-birthYear) * 365
    var h1 = document.createElement('h1')
    var textContent = document.createTextNode('You are '+ totalDays + ' days old.')
    h1.setAttribute('id', 'age-in-days')
    h1.appendChild(textContent)
    document.getElementById('flex-box-result').appendChild(h1)
}

function reset() {
    document.getElementById('age-in-days').remove()
}

// Chalenge 2: Cat Generatror
function catGenerator() {
    var image = document.createElement('img')
    var div = document.getElementById('flex-cat-gen')
    image.src =  'http://thecatapi.com/api/images/get?format=src&type=gif&size=small'
    div.appendChild(image)
}

//Challenge 3: Rock, Paper, Scissor
function rpsGame(yourChoice) {
    var humanChoice, botChoice
    humanChoice = yourChoice.id
    botChoice = numberToChoice(botImageChoice())
    results = decideWinner(humanChoice, botChoice)
    message = finalMessage(results)
    rpsFrontEnd(yourChoice.id, botChoice, message)
}

function botImageChoice() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissor'][number]
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDB = {
        'rock': {'scissor': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissor': 0},
        'scissor': {'paper': 1, 'scissor': 0.5, 'rock': 0}
    }

    var yourScore = rpsDB[yourChoice][computerChoice]
    var computerScore = rpsDB[computerChoice][yourChoice]
    return [yourScore, computerScore]
}

function finalMessage([yourScore, computerScore]) {
    if(yourScore === 0) {
        return {'message': 'You lost', 'color': 'red'}
    } else if(yourScore === 0.5){
        return {'message': 'You tied', 'color': 'yellow'}
    } else {
        return {'message': 'You won', 'color': 'green'}
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imageDB = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    }

    document.getElementById('rock').remove()
    document.getElementById('paper').remove()
    document.getElementById('scissor').remove()

    var humanDiv = document.createElement('div')
    var botDiv = document.createElement('div')
    var messageDiv = document.createElement('div')

    humanDiv.innerHTML = "<img src='" + imageDB[humanImageChoice]+"' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'/>"
    botDiv.innerHTML = "<img src='" + imageDB[botImageChoice]+"' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)'/>"
    messageDiv.innerHTML = "<h1 style='color: "+finalMessage['color']+ ";font-size: 60px; padding: 30px; '>"+finalMessage['message']+"</h1>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv)
    document.getElementById('flex-box-rps-div').appendChild(messageDiv)
    document.getElementById('flex-box-rps-div').appendChild(botDiv)
}

//Challeng 4: Change the color of all buttons
var allButtons = document.getElementsByTagName('button')
var copyAllButtons = []
for (let i = 0; i < allButtons.length; i++) {
        copyAllButtons.push(allButtons[i].classList[1])
}

function buttonColorChange(buttonThingy) {
    if(buttonThingy.value === 'red') {
        butttonsRed()
    } else if(buttonThingy.value === 'green') {
        buttonsGreen()
    } else if(buttonThingy.value === 'reset') {
        buttonsColorReset()
    } else if(buttonThingy.value === 'random') {
        randomColors()
    }
}

function butttonsRed() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1])
        allButtons[i].classList.add('btn-danger')
    }
}

function buttonsGreen() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1])
        allButtons[i].classList.add('btn-success')
    }
}

function buttonsColorReset() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i])
    }
}

function randomColors() {
    let choices = ['btn-primary', 'btn-danger', 'btn-warning', 'btn-warning']
    for (let i = 0; i < allButtons.length; i++) {
        let randomColorChoice = choices[Math.floor(Math.random() *4)]
        allButtons[i].classList.remove(allButtons[i].classList[1])
        allButtons[i].classList.add(randomColorChoice)

    }
}

//Challenge 5: Black Jack
let blackjackGame = {
  'you':{'scoreSpan':'#your-blackjack-result', 'div':'#your-box', 'score':0},
  'dealer':{'scoreSpan':'#dealer-blackjack-result', 'div':'#dealer-box', 'score':0},
  'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
  'cardMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
  'wins':0,
  'losses':0,
  'draws':0,
  'standBtnOn':false,
  'dealBtnOn': false
}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('sounds/hit.mp3')
const winSound = new Audio('sounds/aww.mp3')
const lossSound = new Audio('sounds/aww.mp3')

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit)
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic)
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal)

function blackjackHit() {
    if(blackjackGame['standBtnOn'] === false) {
    let card = randomCard()
    showCard(card, YOU)
    updateScore(card, YOU)
    showScore(YOU)
    }

}

function randomCard() {
    let randNum = Math.floor(Math.random() * 13)
    return blackjackGame['cards'][randNum]
}

function showCard(card, activePlayer) {
    if(activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img')
        cardImage.src = `static/images/${card}.png`
        document.querySelector(activePlayer['div']).appendChild(cardImage)
        hitSound.play()
    }
}

function blackjackDeal() {
    if(blackjackGame['dealBtnOn'] === true) {

        blackjackGame['standBtnOn'] = false

        let yourImages = document.querySelector('#your-box').querySelectorAll('img')
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')
        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0
        DEALER['score'] = 0
        document.querySelector('#your-blackjack-result').textContent = 0
        document.querySelector('#dealer-blackjack-result').textContent = 0
        document.querySelector('#your-blackjack-result').style.color = 'white'
        document.querySelector('#dealer-blackjack-result').style.color = 'white'

        document.querySelector('#blackjack-result').textContent = "Let's play"
        document.querySelector('#blackjack-result').style.color = 'black'

        blackjackGame['dealBtnOn'] = false
    }
}

function updateScore(card, activePlayer) {
    if(card ==='A') {
        if(activePlayer['score'] + blackjackGame['cardMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardMap'][card][1]
        } else {
            activePlayer['score'] += blackjackGame['cardMap'][card][0]
        }
    } else {
        activePlayer['score'] += blackjackGame['cardMap'][card]
    }
}
function showScore(activePlayer) {
    if(activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'Bust !'
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
     }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function dealerLogic() {
    blackjackGame['standBtnOn'] = true

    while(DEALER['score'] < 16 && blackjackGame['standBtnOn'] === true) {
        let card = randomCard()
        showCard(card, DEALER)
        updateScore(card, DEALER)
        showScore(DEALER)
        await sleep(1000)
    }

    blackjackGame['dealBtnOn'] = true
    let winner = computeWinner()
    showResults(winner)
}
//compute winner
//update the wins. losses and draws
function computeWinner() {
    let winner;
    if(YOU['score'] <= 21) {
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackGame['wins']++
            winner = YOU

        } else if(YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++
            winner = DEALER

        } else if(YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++
        }
    } else if(YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++
        winner = DEALER
    } else if(YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++
    }
    return winner
}

function showResults(winner) {
    if(blackjackGame['dealBtnOn'] === true ) {
        let message, msgColor
        if(winner === YOU) {
            document.getElementById('wins').textContent = blackjackGame['wins']
            message = 'You won!'
            msgColor = 'green'
            winSound.play()
        } else if(winner === DEALER) {

            document.getElementById('losses').textContent = blackjackGame['losses']
            message = 'You lost!'
            msgColor = 'red'
            winSound.play()
        } else {
            document.getElementById('draws').textContent = blackjackGame['draws']
            message = 'You drew!'
            msgColor = 'black';
        }

        document.querySelector('#blackjack-result').textContent = message
        document.querySelector('#blackjack-result').style.color = msgColor
    }
}