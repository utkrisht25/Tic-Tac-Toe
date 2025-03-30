import { useState } from "react";



export default function Player({ initialName , symbol , isActive}){
    const [playerName , setPlayerName] = useState(initialName);
    const [ isEditing , setIsEditing ] = useState(false);

    function handleEditClick(){
            // setIsEditing(!isEditing); //this will reverse the current state true to false and vice versa
            setIsEditing((prev)=> !prev ) //setIsEditing fxn automatic takes the prev(current) state as parameter and here we change it using this arrow fxn

    }
    function handleChange(event){
            console.log(event);
            setPlayerName(event.target.value);
    }

    let editableplayerName = <span className="player-name">{playerName}</span>
     
        if(isEditing){
            editableplayerName = <input type="text" required value={playerName} onChange={handleChange} />
        }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editableplayerName}
                <span className="player-symbol">
                    {symbol}
                </span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'save' : 'edit'}</button>
        </li>
    );
}