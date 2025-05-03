import { render } from 'sass';
import '../styles/style.scss';

function Gameboard() {
    let gameboard = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    // Using spread operator to create a shallow copy of the array and not to actually return the reference of the array
    const getGameboard = () => [...gameboard];

    const resetGameboard = () => {
        for (let i = 0; i < gameboard.length; i++) {
            gameboard[i] = '';
          }
    }

    const isDraw = () => {
        let isDraw = true;

        for (const element of gameboard) {
            if (element === '') isDraw = false;
        }
        return isDraw;
    }

    const renderGameboard = () => {
        const boxElements = [...document.querySelectorAll('.box')];

        for (let element in gameboard) {
            const boxElement = boxElements[element];
            const img = boxElement.querySelector('img');

            if (gameboard[element] === 'X') {
                img.setAttribute('src', '/public/imgs/X.png');
            } else if (gameboard[element] === 'O') {
                img.setAttribute('src', '/public/imgs/O.png');
            } else {
                img.setAttribute('src', '#');
            }
        }
    }

    const playMove = (position, player) => {
        let positionTaken = gameboard[position] !== '';
    
        if (position === undefined) throw new Error('Invalid row/column number(s). Max is number is 3 for both row and column field.');
        
        if (!positionTaken) {
            gameboard[position] = player.playerMark;
        }
    }
    
    return {
        getGameboard,
        isDraw,
        renderGameboard,
        playMove,
        resetGameboard,
    }
}

function Player(name, mark) {
    const playerName = name;
    const playerMark = mark;

    return { 
        playerName,
        playerMark,
    }
}

function checkWinner(gameboard, player) {
    let isWinner = false;
    
    if (
        gameboard[0] === player.playerMark &&
        gameboard[1] === player.playerMark &&
        gameboard[2] === player.playerMark 
    ) {
        isWinner = true;
    } else if (
        gameboard[3] === player.playerMark &&
        gameboard[4] === player.playerMark &&
        gameboard[5] === player.playerMark 
    ) {
        isWinner = true;
    } else if (
        gameboard[6] === player.playerMark &&
        gameboard[7] === player.playerMark &&
        gameboard[8] === player.playerMark 
    ) {
        isWinner = true;
    } else if (
        gameboard[0] === player.playerMark &&
        gameboard[3] === player.playerMark &&
        gameboard[6] === player.playerMark 
    ) {
        isWinner = true;
    } else if (
        gameboard[1] === player.playerMark &&
        gameboard[4] === player.playerMark &&
        gameboard[7] === player.playerMark 
    ) {
        isWinner = true;
    } else if (
        gameboard[2] === player.playerMark &&
        gameboard[5] === player.playerMark &&
        gameboard[8] === player.playerMark 
    ) {
        isWinner = true;
    } else if (
        gameboard[6] === player.playerMark &&
        gameboard[4] === player.playerMark &&
        gameboard[2] === player.playerMark 
    ) {
        isWinner = true;
    } else if (
        gameboard[8] === player.playerMark &&
        gameboard[4] === player.playerMark &&
        gameboard[0] === player.playerMark 
    ) {
        isWinner = true;
    } 
    return isWinner;
}

(function () { 
    const createPlayers = (e) => {
        e.preventDefault();
        const dialogStart = document.querySelector('.dialog__start');
        const p1Input = document.getElementById('p1').value.trim();
        const p2Input = document.getElementById('p2').value.trim();
        
        if (p1Input && p2Input) {
            p1 = Player(p1Input, 'X');
            p2 = Player(p2Input, 'O');
            dialogStart.close();
            startGame();
        }
    }

    const startGame = () => {
        const gameContainer = document.querySelector('.container');
        const playerTurn = document.querySelector('.player-turn');
        game.addEventListener('click', playRound);

        playerTurn.textContent = `${p1.playerName}'s turn...`;
        gameContainer.classList.add('active');
        currentPlayer = p1;

    }

    const switchTurns = () => {
        const elements = document.querySelectorAll('.box');
        const playerTurn = document.querySelector('.player-turn');
    
        if (currentPlayer === p1) {
            elements.forEach(el => el.classList.toggle('p2'));
            currentPlayer = p2;
        } else {
            elements.forEach(el => el.classList.toggle('p2'));
            currentPlayer = p1;
        }
        playerTurn.textContent = `${currentPlayer.playerName}'s turn...`;
    }

    const playRound = (e) => {
        if (!e.target.classList.contains('box')) return;

        let position = Number(e.target.getAttribute("data-position"));
        console.log(e.target);
        console.log(position);
        
        gameboard.playMove(position, currentPlayer);
        gameboard.renderGameboard();
        
        let gameState = gameboard.getGameboard();
        let roundWon = checkWinner(gameState, currentPlayer);   
        let isDraw = gameboard.isDraw();

        if (roundWon || isDraw) {
            const dialogReset = document.querySelector('.dialog__reset');
            const winnerText = document.querySelector('.dialog__reset__header');

            winnerText.textContent = roundWon ? `${currentPlayer.playerName} wins!` : `It's a draw!`;
            dialogReset.showModal();
            game.removeEventListener('click', playRound);
            return;
        }
        switchTurns();
    } 

    const resetState = () => {
        const gameContainer = document.querySelector('.container');
        const dialogStart = document.querySelector('.dialog__start');
        const dialogReset = document.querySelector('.dialog__reset');

        game.removeEventListener('click', playRound);
        gameContainer.classList.remove('active');

        gameboard.resetGameboard();
        gameboard.renderGameboard();
        form.reset();
        dialogStart.showModal();
        dialogReset.close();
    }

    const form = document.getElementById('form');
    const game = document.querySelector('.game');
    const restartBtn = document.querySelector('.restart-btn');
    const dialogResetBtn = document.querySelector('.dialog__reset button');
    const gameboard = Gameboard();
    
    let p1;
    let p2;
    let currentPlayer;

    form.addEventListener('submit', createPlayers);
    restartBtn.addEventListener('click', resetState);
    dialogResetBtn.addEventListener('click', resetState);
})();