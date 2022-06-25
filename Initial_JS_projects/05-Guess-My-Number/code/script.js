'use strict';
let MAX=20
let MIN=1
let TRYS=20
let correctNumber=""
let highscore=0
const WINNERCOLOR=`#60b347`
const LOOSERCOLOR="red"
const DEFAULTCOLOR="#222";




function randomNumber(){
    return Math.ceil(Math.random()*MAX)
}

function check(){
    let guess=Number(document.querySelector(`.guess`).value);
    let score=document.querySelector(`.score`)
    let message= document.querySelector(`.message`)
    let body=document.querySelector(`body`)
    
    if(guess<MIN || guess>MAX){
        message.textContent="Not a valid number pls insert a valid one 🚓"
        return
    }
    if(guess===correctNumber){
        body.style.backgroundColor= WINNERCOLOR
        if(highscore<TRYS){
            highscore=TRYS
            document.querySelector(`.highscore`).textContent=highscore
            message.textContent=`U won congratulation 🎉 and it's a new record!! `
        }else{
            message.textContent=`U won congratulation 🎉`
        }
        document.querySelector(`.number`).textContent=correctNumber
        gameOver()
    }else{
        TRYS--
        score.textContent=TRYS
        if(TRYS<=0){
            body.style.backgroundColor= LOOSERCOLOR
            message.textContent=`💥Game over u lost, try again!`
            gameOver()
            return
        }
        guess>correctNumber?message.textContent=`To High try again! 🔥`:message.textContent=`To low try again! ❄`
           
    }
}


function gameOver(){
    document.querySelector(`.check`).removeEventListener(`click`,check)
}


function again(){
    TRYS=20
    document.querySelector(`body`).style.backgroundColor=DEFAULTCOLOR
    document.querySelector(`.guess`).value=""
    document.querySelector(`.number`).textContent="?"
    document.querySelector(`.message`).textContent="Start guessing..."
    startGame()
}

function startGame(){
    document.querySelector(`.between`).textContent=`(Between ${MIN} and ${MAX})`
    document.querySelector(`.score`).textContent=TRYS
    document.querySelector(`.check`).addEventListener("click",check)
    document.querySelector(`.again`).addEventListener(`click`,again)
    correctNumber=randomNumber()
}

startGame()