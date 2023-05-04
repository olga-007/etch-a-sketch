// see https://www.theodinproject.com/lessons/foundations-rock-paper-scissors

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

function playRound(playerSelection, computerSelection) {
    const playerSelectionLower = playerSelection.toLowerCase();
    const computerSelectionLower = computerSelection.toLowerCase();
    let result;
    if (computerSelectionLower === playerSelectionLower) {
        result = "Draw! (" + computerSelection + ")";
    } else if (computerSelectionLower === 'rock' && playerSelectionLower == 'scissors'
        || computerSelectionLower === 'paper' && playerSelectionLower == 'rock'
        || computerSelectionLower === 'scissors' && playerSelectionLower == 'paper') {
        result = "You lose! " + computerSelection + " beats " + playerSelection;
    } else {
        result = "You win! " + playerSelection + " beats " + computerSelection;
    }
    return result;
}

function isValidSelection(selection) {
    const selectionLower = (selection ?? "").toLowerCase();
    return selectionLower === 'rock' || selectionLower === 'paper' || selectionLower === 'scissors';
}

function game() {
    let round = 1;
    while (round <= 5) {
        let playerSelection = prompt("Round " + round + ": Rock, Paper, or Scissors?");

        if (playerSelection === null) {
            console.log("Canceled");
            break;
        }
        if (isValidSelection(playerSelection)) {
            let computerSelection = getComputerChoice();
            console.log("Round " + round + ": " + playRound(playerSelection, computerSelection));
            round++;
        }
    }

}

game();
