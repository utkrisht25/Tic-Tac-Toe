import { useState } from "react";

const initialGameBoard = [
    [null , null , null],
    [null , null , null],
    [null , null , null]
];

export default function GameBoard({ onSelectSquare , activePlayerSymbol}){
    const [gameBoard , setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex , colIndex){
        setGameBoard((prevGameBoard)=>{
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]; //2-d array desrtucturing 
            //above line will create a copy of our original array that we get in this fxn (copy of prevGameBoard)
            updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
            return updatedBoard ;
        });
        //this approach will update our array or board immutably that is best approach

        onSelectSquare();
    }
    return(
        <ol id="game-board">
            {gameBoard.map((row , rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) =>(
                            <li key={colIndex}>
                                <button onClick={()=> handleSelectSquare(rowIndex, colIndex) }>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
