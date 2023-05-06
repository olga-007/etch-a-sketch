// see https://www.theodinproject.com/lessons/foundations-revisiting-rock-paper-scissors

function getComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    let choice;

    switch (randomNumber) {
        case 0:
            choice = 'Rock';
            break;
        case 1:
            choice = 'Paper';
            break;
        case 2:
            choice = 'Scissors';
            break;
    }
    return choice;
}

let computerScore = 0;
let playerScore = 0;

function playRound(playerSelection, computerSelection) {
    if (computerSelection === playerSelection) {
        return {
            code: 'draw',
            message: `Draw! (${computerSelection})`,
        };
    }

    if (computerSelection === 'Rock' && playerSelection === 'Scissors'
        || computerSelection === 'Paper' && playerSelection === 'Rock'
        || computerSelection === 'Scissors' && playerSelection === 'Paper') {
        computerScore++;
        return {
            code: 'loss',
            message: `You lose! ${computerSelection} beats ${playerSelection}`,
        };
    }

    playerScore++;
    return {
        code: 'win',
        message: `You win! ${playerSelection} beats ${computerSelection}`,
    };
}

const resultDiv = document.getElementById('result');

const resultInfo = document.createElement('div');
resultInfo.classList.add('info');
resultDiv.appendChild(resultInfo);

const messages = document.createElement('div');
resultDiv.appendChild(messages);

function reset() {
    computerScore = 0;
    playerScore = 0;

    resultInfo.textContent = '';

    while (messages.firstChild) {
        messages.removeChild(messages.firstChild);
    }

    resultDiv.removeChild(resultDiv.lastChild); // remove the reset button
}

function game() {
    if (playerScore < 5 && computerScore < 5) {
        const result = playRound(this.id, getComputerChoice());

        resultInfo.textContent = `SCORE: you: ${playerScore}, computer: ${computerScore}`;

        const message = document.createElement('div');
        message.textContent = result.message;
        message.classList.add(result.code);
        messages.appendChild(message);

        if (playerScore === 5 || computerScore === 5) {
            resultInfo.textContent = `GAME OVER: ${playerScore > computerScore ? 'you' : 'computer'} won.`;

            const resetBtn = document.createElement('button');
            resetBtn.innerText = 'Reset';
            resultDiv.appendChild(resetBtn);
            resetBtn.addEventListener('click', reset);
        }
    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', game);
});
