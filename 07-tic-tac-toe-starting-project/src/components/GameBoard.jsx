
export default function GameBoard({ onSelectSquare , board}){
    //this approach is based on state 
    // const [gameBoard , setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex , colIndex){
    //     setGameBoard((prevGameBoard)=>{
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]; //2-d array desrtucturing 
    //         //above line will create a copy of our original array that we get in this fxn (copy of prevGameBoard)
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard ;
    //     });
    //     //this approach will update our array or board immutably that is best approach

    //     onSelectSquare();
    // }
    return(
        <ol id="game-board">
            {board.map((row , rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) =>(
                            <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)}
                                        disabled = {playerSymbol !== null} // playersymbol = X or O then button is disabled now & if == null no player click this button till now
                                    >{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
