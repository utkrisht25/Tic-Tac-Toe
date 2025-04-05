import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./Winning-combinations.js";

const PLAYERS = {
  X : 'Player 1',
  O : 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null , null , null],
  [null , null , null],
  [null , null , null]
];

function deriveActivePlayer(gameTurns){
      let currentPlayer = 'X';
      if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O';
      }
      return currentPlayer;
}
function deriveGameBoard(gameTurns){
  let gameBoard= [...INITIAL_GAME_BOARD.map((Array)=> [...Array]) ];
  for(const turn of gameTurns){
      //object destructuring 
      const {square , player} = turn;
      const {row , col} = square;
      gameBoard[row][col] = player;
  }
  return gameBoard;
}
function derivedWinner(gameBoard , players){
  let winner ;

  for(const combination of WINNING_COMBINATIONS){
    //here these symbols are either X or O so we can use them to identify the winner name 
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol]; //we use the player state to show the name of the winner with the help of symbol assign to that player
    } 
  }
  return winner;
}

function App() {
  const [players , setPlayers] = useState({
    X : 'Player 1',
    O : 'Player 2'
  });
  const [gameTurns , setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);

  
  
  const winner = derivedWinner(gameBoard , players);
  const hasDraw = gameTurns.length === 9 && !winner

  //const [activePlayer , setActivePlayer] = useState('X'); //this state is common for both player and gameboard component 
  //using the concept of STATE LIFTING UP

  //we write a function now that executed when the state change and the symbol change also 
  function handleSelectSquare(rowIndex , colIndex) {
    setGameTurns((prevTurns)=>{

      const currentPlayer = deriveActivePlayer(prevTurns);

      //this square & player is the latest object here 
      const updatedTurns = [
        {square:{ row : rowIndex , col: colIndex}, player : currentPlayer}, 
         ...prevTurns,
      ];

      return updatedTurns;
    });
  
  }
    //it will reset the GameTurns again to no values , so that next time 2 new players came , they can play without any previous entries in the board
  function handleComplete(){
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol , newName){
    setPlayers(prevPlayers =>{
      return {
        ...prevPlayers , 
        [symbol] : newName
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
           <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
           <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
      {/* this handleselectsquare will execute in GameBoard component so we paas it as a prop to GameBoard */}
      {/* and here this active player is the common state that is work for both gameboard and player component */}
      {/* and this is concept of state lifting up that is appling a state to multi component from a another component(parent component)  */}

          {(winner || hasDraw) && <GameOver winner={winner} onComplete={handleComplete} /> }
          <GameBoard onSelectSquare={handleSelectSquare} board= {gameBoard} />

      </div>
        <Log  turns = {gameTurns}/>
    </main>
  );
}

export default App;
