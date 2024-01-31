import React from 'react'
import './App.css'
import Dice from './dice'
import Confetti from 'react-confetti'



function App() {
  const [count, setCount] = React.useState(0)
  const [dices, setDices] = React.useState(diceGen())
  const [tenzies, setTenzies] = React.useState(false)

  function diceGen() {
    let diceArr = [];
    for (let i = 0; i < 10; i++) {
      diceArr.push({
        value: Math.floor(Math.random() * 6),
        id: [i],
        isHeld: false
      })
    }
    return diceArr
  }

  function rollDice() {
    setDices(
      predices => predices.map(
        predice => predice.isHeld ? predice : {...predice, value:Math.floor(Math.random() * 6)
        }))

    setCount(pre => pre + 1)
  }

  // console.log('hello')

  function holdDice(id){

    //this code have some bug
  //   setDices(preDices =>{
  //     for(let i=0; i<preDices.length; i++){
  //   var newArr = preDices[i].id === id ? {...preDices[i],isHeld:!preDices[i].isHeld} : preDices[i]
  //     }
  // }
  //   )
    setDices(
      preDices => preDices.map(
        predice => predice.id === id ? {...predice,isHeld:!predice.isHeld}:predice
        ))
  }

  React.useEffect(() =>{
    let allDiceHeld = dices.every(dice => dice.isHeld=== true)
    let allValueSame = dices.every(dice => dice.value === dices[0].value)

   if( allDiceHeld && allValueSame) { 
    setTenzies(true)
  console.log('you won the game')
  }
  },[dices])




  
function newGame(){
  setDices(diceGen())
  setTenzies(false)
  setCount(0)
}
  let diceElement = dices.map(d => <Dice value={d.value} key={d.id} isHeld={d.isHeld} id={d.id} holdDice={holdDice}/>)
  return (
    <>
      {tenzies && <Confetti/>}
    <main>
      <span>No. of Rolls : {count}</span>
      <h1>tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElement}
      </div>

      {
                tenzies ?
            <button className="roll-button" onClick={newGame} > New Game </button>: 
            <button className="roll-button" onClick={rollDice} > Roll </button>
            }

    </main>
    </>
  )
}

export default App
