import React from "react";
export default function Dice(props){
    let style = {
        backgroundColor: props.isHeld ? '#59E391': 'white'
    }
    return (
        <h1
         className="dice" 
         style={style}
         onClick={()=> props.holdDice(props.id)}
         >{props.value}</h1>
    )
}