//This project will only be playable by two people.

/*An IIFE module to restrict the gameboard to be a single instance*/
const GameBoard = (function() {
    const gameboard = [];
    let playerOne;
    let playerTwo;

    const form = document.getElementById("playerForm");
    //Set up the event listener for when the player clicks the start button
    const startButton = document.getElementById("submit");
    startButton.addEventListener("click", (event) => {
        event.preventDefault();
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
        playersTurnName.textContent = "Player one click one of the tiles to start!";

        //Populate the gameboard array with nine possible values for a 3 x 3 grid
        for (let i = 0; i < 9; i++) {
            gameboard[i] = "";
  
            //Get all of the divs of the gameboard and set event listeners on them
            const div = document.getElementById(i);
  
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
            div.classList.add("disabled");
            div.removeEventListener("click", handleClick);
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

    /*Given a board array of the moves the player has made, checks to see if the array matches any winning combination*/
    const checkWinner = (boardarray) => {
        //Scenario 1: rows
        
        //Scenario 2: columns

        //Scenario 3: diagonals
    }

    return {
        displayBoard, getPlayerTurn
    }
})(); //Closed parenthesis here = IIFE



