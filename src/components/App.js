import '../css/App.css';
import React, { useEffect, useState } from 'react';
import { Tile } from './Tile';


// function randomized(tiles){
//   let values = [...Array(15).keys()].map((x) => x+1) // array of numbers from 1 -> 15

//   let i = 0, j = 0
//   while (values.length){

//     // Take a random element from the values array
//     let r = Math.floor(Math.random()*values.length)
//     tiles[i][j] = values[r]
//     values.splice(r, 1)

//     // move to the next tile cell
//     j++
//     if (j === 4){
//       j = 0
//       i++
//     }
//   }

//   tiles[3][3] = 0

// }



function valid_index(index) {
  return index >= 0 && index <= 15
}

function ordered() {
  let tiles = [...Array(15).keys()].map((x) => x + 1)
  tiles.push(0)
  return tiles
}

function App() {
  const [tiles, setTiles] = useState([])
  const [winner, setWinner] = useState(false)
  const [moves, setMoves] = useState(0)
  useEffect(() => {
    //randomized(tiles)
    setTiles(ordered())
  }, [])


  const onSelect = (pressed_index) => {

    let adjacent_positions = [
      pressed_index + 4, pressed_index - 4, pressed_index + 1, pressed_index - 1
    ]

    for (let index of adjacent_positions) {
      if (valid_index(index) && tiles[index] === 0) {
        let new_tiles = [...tiles] // copy
        let temp = new_tiles[index]
        new_tiles[index] = new_tiles[pressed_index]
        new_tiles[pressed_index] = temp
        setTiles(new_tiles)
        setMoves(moves+1)


        // check if it's solved
        let c = 1
        let winnerFlag = true
        for (let i = 0; i <= 14; i++) {
          if (new_tiles[i] !== c++)
            winnerFlag = false
        }

        setWinner(winnerFlag)
        

        break
      }
    }

  }



  return (
    <React.Fragment>
      <h1> 15 puzzle </h1>

      <div className="App">
        {
          tiles.map((x, i) => (
            <Tile onSelect={onSelect} value={x} index={i} disabled={winner} />
          ))
        }

        {winner &&
          <div className="play-again-div">
            <button className="play-again-btn" onClick={()=>{setWinner(false); setMoves(0)}}>Play Again</button>
          </div>}
      </div>

      <h3> Moves : {moves}</h3>

    </React.Fragment>

  );
}

export default App;