import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
function App() {
  const [activePlayer , setActivePlayer] = useState('X'); //this state is common for both player and gameboard component 
  //using the concept of STATE LIFTING UP

  //we write a function now that executed when the state change and the symbol change also 
  function handleSelectSquare() {
    setActivePlayer((currentActivePlayer) =>  (currentActivePlayer === 'X' ? 'O' : 'X'));
  }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
           <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
           <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
      {/* this handleselectsquare will execute in GameBoard component so we paas it as a prop to GameBoard */}
      {/* and here this active player is the common state that is work for both gameboard and player component */}
      {/* and this is concept of state lifting up that is appling a state to multi component from a another component(parent component)  */}
          <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} />

      </div>
        log
    </main>
  );
}

export default App;
