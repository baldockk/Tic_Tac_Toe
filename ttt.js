//This project will only be playable by two people.

/*An IIFE module to restrict the gameboard to be a single instance*/
const GameBoard = (function() {
    const gameboard = [];
    let playerOne;
    let playerTwo;
    //Variable that determines the state of the game... AKA is it won yet?
    let winState;

    const form = document.getElementById("playerForm");
    //Set up the event listener for when the player clicks the start button
    const startButton = document.getElementById("submit");
    //Resets the winnter premeditatively
    const winLabel = document.getElementById("winner");
    startButton.addEventListener("click", (event) => {
        winLabel.textContent = "";
        startButton.textContent = "Restart Game";
        event.preventDefault();

        GameController.resetTurn();
        GameController.displayBoard(); 
        GameBoard.setUpGame(); 

        playerOne = document.getElementById("playerOne").value;
        playerTwo = document.getElementById("playerTwo").value;
        
        PlayerFactory.createPlayer(playerOne);
        PlayerFactory.createPlayer(playerTwo);

        const welcomeLabel = document.getElementById("competitors");
        welcomeLabel.textContent = playerOne + " vs " + playerTwo;
    });

    /*Point of access to setting the game up*/
    const setUpGame = () => {
        const playersTurnName = document.getElementById("currentTurn");
        playersTurnName.textContent = "Player one, click one of the tiles to start!";

        //Populate the gameboard array with nine possible values for a 3 x 3 grid
        for (let i = 0; i < 9; i++) {
            gameboard[i] = "";
  
            //Get all of the divs of the gameboard and set event listeners on them
            const div = document.getElementById(i);
            div.classList.add("enabled");

            //Define the event listener function
            const handleClick = (event) => {
                //Check whose turn it is
                let playersTurn = GameController.getPlayerTurn();
  
                //Check which div is clicked and update the array index at that position
                let clickedDivNum = parseInt(div.id);
  
                if (playersTurn === "playerOne") {
                    div.textContent = "X";
                    playersTurnName.textContent = "It's " + playerOne + "'s turn";
                    //Log the turn to the array
                    gameboard[clickedDivNum] = "X";
                } else {
                    div.textContent = "O";
                    playersTurnName.textContent = "It's " + playerTwo + "'s turn";
                    //Log the turn to the array
                    gameboard[clickedDivNum] = "O";
                }
  
            //Disable the div so it cannot be clicked again
            div.classList = "square disabled";
            div.removeEventListener("click", handleClick);
            winState = GameController.checkWinner(gameboard);
            if(winState === "X"){
                GameController.endGame(playerTwo);
            } else if(winState === "O"){
                GameController.endGame(playerOne);
            } else if(winState === "it's a tie"){
                GameController.endGame(winState);
            } else{
                return;
            }
            };
        div.addEventListener("click", handleClick); 
        }
    }
    return {
        setUpGame
    }
})();

/*Encapsulates the creation of players in the factory pattern*/
const PlayerFactory = (() => {
    let playerName;
    const createPlayer = (name) => {
        playerName = name;
        return { name };
    };

    return {
        createPlayer
    };
})();

/*An IIFE module to restrict the display controller to be a single instance which is immediately invoked*/
const GameController = (function() {
    /*Point of access to displaying the board on the DOM*/
    const displayBoard = () => {
        //Create the HTML elements starting with a fresh html within the gameboard
        //First get the div which will be cleared and then populated
        const boardDiv = document.querySelector(".gameboard");
        boardDiv.innerHTML = ""; 

        //Populate the div with nine squares, uniquely identifiable by the creation index and grouped using a square class list
        for(let i = 0; i < 9; i++){
            const square = document.createElement("div");
            square.id = i;
            square.classList.add("square");
            boardDiv.appendChild(square);
        }
    }

    //Setting the turn to -1 and incrementing it will start the turns off at zero
    let turn = -1;

    /*Gets the id of the player whose turn it is*/
    const getPlayerTurn = () => {
        turn++;
        if(turn % 2 === 0){
            return "playerTwo";
        } else {
            return "playerOne";
        }
    }

    const resetTurn = () => {
        turn = -1;
    };

    /*Given a board array of the moves the player has made, checks to see if the array matches any winning combination. Will return the symbol of the winner*/
    const checkWinner = (boardarray) => {
        //Scenario 1: rows (3 possibilities)
        if(boardarray[0] === boardarray[1] && boardarray[1] === boardarray[2] && boardarray[0] != ""){
            return boardarray[0];
        } else if(boardarray[3] === boardarray[4] && boardarray[4] === boardarray[5] && boardarray[3] != ""){
            return boardarray[3];
        } else if(boardarray[6] === boardarray[7] && boardarray[7] === boardarray[8] && boardarray[6] != ""){
            return boardarray[6];
        } 
        //Scenario 2: columns (3 possibilities)
        else if(boardarray[0] === boardarray[3] && boardarray[3] === boardarray[6] && boardarray[0] != ""){
            return boardarray[0];
        } else if(boardarray[1] === boardarray[4] && boardarray[4] === boardarray[7] && boardarray[1] != ""){
            return boardarray[1];
        } else if(boardarray[2] === boardarray[5] && boardarray[5] === boardarray[8] && boardarray[2] != ""){
            return boardarray[2];
        }
        //Scenario 3: diagonals (2 possibilities)
        else if(boardarray[0] === boardarray[4] && boardarray[4] === boardarray[8] && boardarray[0] != ""){
            return boardarray[0];
        } else if(boardarray[2] === boardarray[4] && boardarray[4] === boardarray[6] && boardarray[2] != ""){
            return boardarray[2];
        } else {
            //Either there's a tie or no winner yet
            //Scenario 4: tie (all filled with no winner)
            //Check all of the array to check that there are values other than an empty string in there
            if(boardarray.includes("")){
                return "no winner yet";
            } else{
                return "it's a tie";
            }
        }
    }

    /*Ends the game. Stops the player from taking another turn by disabling the divs*/
    const endGame = ((winner) => {
        const labelWinner = document.getElementById("winner");

        if(winner === "it's a tie"){
            labelWinner.textContent = "Well played, it's a tie!";
        } else{
            labelWinner.textContent = "Congratulations " + winner + ", you are the winner";
        }

        const labelTurn = document.getElementById("currentTurn");
        labelTurn.textContent = "";
    });

    return {
        displayBoard, getPlayerTurn, checkWinner, endGame, resetTurn
    }
})(); //Closed parenthesis here = IIFE



