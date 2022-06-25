'use strict';
const MAX_DICE_NUM=6
const START_SCORE=0
let scoresPlayers= [START_SCORE,START_SCORE]

let currentPLayer=0
let scoreToSum=0

function randomNumber(){
    return Math.ceil(Math.random()*MAX_DICE_NUM)
}

function turnVerification(number){
    if(number===1){
        changeTurn()
    }
}
function changeTurn(){
    scoreToSum=0

    let current=document.querySelector(`#current--${currentPLayer}`)
    current.textContent=scoreToSum

    let player=document.querySelector(`.player--${currentPLayer}`)
    
    player.classList.remove("player--active")

    currentPLayer===0?currentPLayer=1:currentPLayer=0

    let newPLayer=document.querySelector(`.player--${currentPLayer}`)
    newPLayer.classList.add("player--active")
}

function saveToScore(){
    let score= document.querySelector(`#score--${currentPLayer}`)
    score.textContent=scoresPlayers[currentPLayer]+=scoreToSum
    console.log(scoresPlayers)
    if(winner()){
        return
    }
    changeTurn()
}

function rollDice(){
    let diceimg=document.querySelector(".dice")
    let current=document.querySelector(`#current--${currentPLayer}`)
    let rNumber=randomNumber()
    scoreToSum+=rNumber
    current.textContent=scoreToSum
    diceimg.src=`dice-${rNumber}.png`
    turnVerification(rNumber)
}

function giveEvents(){
    let diceRoll=document.querySelector(`.btn--roll`)
    let hold=document.querySelector(`.btn--hold`)
    let newGame= document.querySelector(`.btn--new`)
    newGame.addEventListener("click",initial_reset)
    hold.addEventListener("click",saveToScore)
    diceRoll.addEventListener("click",rollDice)
}

function removeEvent(){
    let diceRoll=document.querySelector(`.btn--roll`)
    let hold=document.querySelector(`.btn--hold`)
    hold.removeEventListener("click",saveToScore)
    diceRoll.removeEventListener("click",rollDice)
}
function initial_reset(){
    let resetWinner=document.querySelector(`.player--${currentPLayer}`)

    if(resetWinner.classList.contains("player--winner")){
        resetWinner.classList.toggle("player--winner")
    }
    
    
    for (let index = 0; index < scoresPlayers.length; index++) {
        scoresPlayers[index]=0
    }
    
    let scores=document.querySelectorAll(".score")
    let currentScore=document.querySelectorAll(".current-score")

    currentScore.forEach(current=> current.textContent=START_SCORE)
    scores.forEach(score=>score.textContent=START_SCORE)

    giveEvents()
}
function winner(){
    if(scoresPlayers[currentPLayer]>=100){
        document.querySelector(`.player--${currentPLayer}`).classList.toggle("player--winner")
        removeEvent()
        return true   
    }
    return false
}
function game(){
    initial_reset()
    
}

game()