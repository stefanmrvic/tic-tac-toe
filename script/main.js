import { render } from 'sass';
import '../styles/style.scss';


function Gameboard() {
    let gameboard = [
        '#', '#', '#',
        '#', '#', '#',
        '#', '#', '#'
    ];

    const resetGameboard = () => {
        for (let i = 0; i < gameboard.length; i++) {
            gameboard[i] = '#';
          }
    }

    const getGameboard = () => {
        console.log(gameboard[0], gameboard[1], gameboard[2]);
        console.log(gameboard[3], gameboard[4], gameboard[5]);
        console.log(gameboard[6], gameboard[7], gameboard[8]);
    }

    const playMove = (row, column, player) => {
        const determineArrayPosition = (row, column) => {
            if (row === 1) return column - 1;
            else if (row === 2) return row + column;
            else if (row === 3) return row + column + 2;
        }

        const position = determineArrayPosition(row, column);

        let positionTaken = gameboard[position] !== '#';
    
        if (position === undefined) throw new Error('Invalid row/column number(s). Max is number is 3 for both row and column field.');
        
        if (!positionTaken) {
            gameboard[position] = player.playerMark;

            let winnerExists = checkWinner(gameboard, player);
            getGameboard();

            if (winnerExists) {
                player.increaseScore();
                announceWinner(player);
                let gameover = checkIsGameOver(p1, p2);

                if (gameover) {
                    console.log('Gameover! Start again.')
                    resetState(p1, p2, resetGameboard);
                } else {
                    resetGameboard();
                    getGameboard();
                    console.log('Play another round! Start again.')
                }
                return;
            }
            switchTurns(player);
        } else {
            getGameboard();
            console.log('That place is already taken! Play again.');
        }
    }
    
    return {
        getGameboard,
        playMove,
        resetGameboard,
    }
}

function Player(name, mark) {
    const playerName = name;
    const playerMark = mark;

    let playerScore = 0;

    const increaseScore = () => playerScore++;
    const showScore = () => playerScore;
    const resetScore = () => playerScore = 0;

    return {
        playerName,
        playerMark,
        increaseScore,
        showScore,
        resetScore,
    }
}

function switchTurns(player) {
    if (player === p1) console.log('Player two plays now!');
    else console.log('Player one plays now!');
}

function announceWinner(player) {
    const { p1Score, p2Score } = Score(p1, p2);

    console.log(`${player.playerName} wins the round!`);
    console.log(`Total score is now: ${p1Score} : ${p2Score}`);
}

function resetState(p1, p2, func) {
    p1.resetScore();
    p2.resetScore();
    func();
}

function playRound() {

}

function checkIsGameOver(p1, p2) {
    let gameover = false;
    let pointsToWin = 3;
    const p1Score = p1.showScore();
    const p2Score = p2.showScore();

    if (p1Score === pointsToWin || p2Score === pointsToWin) {
        gameover = true;
    }

    return gameover;
}

function Score(p1, p2) {
    const p1Score = p1.showScore();
    const p2Score = p2.showScore();

    return {
        p1Score,
        p2Score,
    }
}

function checkWinner(gameboard, player) {
    let winner = false;
    if (
        gameboard[0] === player.playerMark &&
        gameboard[1] === player.playerMark &&
        gameboard[2] === player.playerMark 
    ) {
        gameboard[0] = "-";
        gameboard[1] = "-";
        gameboard[2] = "-";
        winner = true;
    } else if (
        gameboard[3] === player.playerMark &&
        gameboard[4] === player.playerMark &&
        gameboard[5] === player.playerMark 
    ) {
        gameboard[3] = "-";
        gameboard[4] = "-";
        gameboard[5] = "-";
        winner = true;
    } else if (
        gameboard[6] === player.playerMark &&
        gameboard[7] === player.playerMark &&
        gameboard[8] === player.playerMark 
    ) {
        gameboard[6] = "-";
        gameboard[7] = "-";
        gameboard[8] = "-";
        winner = true;
    } else if (
        gameboard[0] === player.playerMark &&
        gameboard[3] === player.playerMark &&
        gameboard[6] === player.playerMark 
    ) {
        gameboard[0] = "|";
        gameboard[3] = "|";
        gameboard[6] = "|";
        winner = true;
    } else if (
        gameboard[1] === player.playerMark &&
        gameboard[4] === player.playerMark &&
        gameboard[7] === player.playerMark 
    ) {
        gameboard[1] = "|";
        gameboard[4] = "|";
        gameboard[7] = "|";
        winner = true;
    } else if (
        gameboard[2] === player.playerMark &&
        gameboard[5] === player.playerMark &&
        gameboard[8] === player.playerMark 
    ) {
        gameboard[2] = "|";
        gameboard[5] = "|";
        gameboard[8] = "|";
        winner = true;
    } else if (
        gameboard[6] === player.playerMark &&
        gameboard[4] === player.playerMark &&
        gameboard[2] === player.playerMark 
    ) {
        gameboard[6] = "/";
        gameboard[4] = "/";
        gameboard[2] = "/";
        winner = true;
    } else if (
        gameboard[8] === player.playerMark &&
        gameboard[4] === player.playerMark &&
        gameboard[0] === player.playerMark 
    ) {
        gameboard[8] = "\\";
        gameboard[4] = "\\";
        gameboard[0] = "\\";
        winner = true;
    } 

    return winner;
}

function playGame(gameboard) {
    
}

function getPlayerName(player) {
    let playerName = prompt(`${player}, enter your name:`).trim();

    while(playerName === '') {
        playerName = prompt(`${player}, enter a valid name:`).trim();
    }

    return playerName;
}

// (function () {
    const p1Name = getPlayerName('Player one');
    const p2Name = getPlayerName('Player two');
    const p1 = Player(p1Name, 'X');
    const p2 = Player(p2Name, 'O');
    const gameboard = Gameboard();
    gameboard.getGameboard();
// })();