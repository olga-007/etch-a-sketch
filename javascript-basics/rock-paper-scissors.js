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

const resultDiv = document.querySelector('div[id=result]');
const resultMsgDiv = document.createElement('div');
resultDiv.appendChild(resultMsgDiv);
resultDiv.appendChild(document.createElement('br'));

function game() {
    if (playerScore < 5 && computerScore < 5) {
        const result = playRound(this.id, getComputerChoice());

        resultMsgDiv.textContent = `SCORE: you: ${playerScore}, computer: ${computerScore}`;

        const div = document.createElement('div');
        div.textContent = result.message;
        div.classList.add(result.code);
        resultDiv.appendChild(div);

        if (playerScore === 5 || computerScore === 5) {
            resultMsgDiv.textContent = `GAME OVER: ${playerScore > computerScore ? 'you' : 'computer'} won.`;
        }
    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', game);
});
