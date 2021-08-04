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



function getAdjacentPositions(index) {
  let arr = [], i = index /4, j = index % 4

  if (i !== 0) arr.push(index-4)
  if (i !== 3) arr.push(index+4)
  if (j !== 0) arr.push(index-1)
  if (j !== 3) arr.push(index+1)
  return arr
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

    let adjacent_positions = getAdjacentPositions(pressed_index)

    for (let index of adjacent_positions) {
      if (tiles[index] === 0) {
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

  const shuffleArray = () => {
    let newTiles = [...tiles]
      for (let i = newTiles.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
      }
      setTiles(newTiles)
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

      <div className="sidebar">
      <h3> Moves : {moves}</h3>
        <button className="shuffle" onClick={shuffleArray}> Shuffle</button>
      </div>


    </React.Fragment>

  );
}

export default App;
