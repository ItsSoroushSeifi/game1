'use strict';
/*
console.log(document.querySelector('.message').textContent);"
document.querySelector('.message').textContent = "Correct Number!.🤩
document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;
document.querySelector('.guess').value = 23;
*/
let secretNumber = Math.trunc(Math.random() * (20)) + 1;
let highscore = Number(localStorage.getItem('highscore')) || 0;
document.querySelector('.highscore').textContent = highscore;
let score = 0;
let tries = 10;
let level = 1
const rangeIncrese = 10;

const resetFields = function () {
    document.querySelector('.number').textContent = '?';
    document.querySelector('.message').textContent = 'start guessing...'
    secretNumber = Math.trunc(Math.random() * (10 + (level * 10))) + 1;
    document.querySelector('.guess').value = "";
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    startGame();
    document.querySelector('.between').textContent = `level ${level}: (Between 1 and ${(10 + (level * 10))})`;
}

const resetGame = function () {
    level = 1;
    resetFields()
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    score = 0;
    document.querySelector('.triesLeft').textContent = 10;
    document.querySelector('input').style.background = 'none';
    document.querySelector('input').disabled = false;
    score = 0;
    document.querySelector('.score').textContent = score;
}

const lost = function () {
    console.log('calling lost func before condition',score,highscore);
    if (score > highscore) {
        
        highscore = score;
        document.querySelector('.highscore').textContent = score;
        localStorage.setItem('highscore', highscore);

    
    }
    console.log('calling lost func',score,highscore);
    document.querySelector('.message').textContent = 'You Lost!'
    document.querySelector('.triesLeft').textContent = 0;
    document.querySelector('input').disabled = true;
    document.querySelector('input').style.backgroundColor = 'red';
    document.querySelector('input').style.background = 'available';
}

const goNext = function () { 
    console.log('calling next')
    if (level !== 100) {
        level++
        resetFields();
        document.querySelector('.check').textContent = 'check';
        document.querySelector('.check').removeEventListener('click', goNext);
        document.querySelector('.check').addEventListener('click', startGame);
    }
    
}

const startGame= () => {
    let guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);
    if (!guess) {
        document.querySelector('.message').textContent = 'please input a number';
    } else if (guess === secretNumber) {
        document.querySelector('.message').textContent = 'Correct Number!.🤩';
        document.querySelector('body').style.backgroundColor = '#60b347'
        document.querySelector('.number').style.width = '30rem';
        document.querySelector('.number').textContent = secretNumber;
        score = 5 * (level)
        document.querySelector('.score').textContent = score;
        document.querySelector('.check').textContent = 'Go Next Level!';
        document.querySelector('.check').removeEventListener('click', startGame);
        document.querySelector('.check').addEventListener('click', goNext);
    } else if (guess > secretNumber) {
        if (tries > 1) {
            document.querySelector('.message').textContent = 'Too High!'
            tries--;
            document.querySelector('.triesLeft').textContent = tries;
        } else {
            lost();
        }
    } else if (guess < secretNumber) {
        if (tries > 1) {
            document.querySelector('.message').textContent = 'Too Low!'
            tries--;
            document.querySelector('.triesLeft').textContent = tries;
        } else {
            lost();
        }
    }    
}

document.querySelector('.check').addEventListener('click', startGame);
document.querySelector('.again').addEventListener('click', function () {
    resetGame();
})
startGame()