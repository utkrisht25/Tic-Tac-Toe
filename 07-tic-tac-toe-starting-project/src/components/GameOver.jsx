export default function GameOver({winner , onComplete}){
    return ( <div id="game-over">
        <h2>Game Over!</h2>
        {winner && <p>{winner} won!</p>}
        {!winner && <p>It's a Draw!</p> }
        <p>
            <button onClick={onComplete} >Rematch!</button>
        </p>


    </div>);
}