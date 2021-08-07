import '../css/Grid.css';
import React, { useEffect, useState } from 'react';
import { Tile } from './Tile';
import { SideBar } from './SideBar';


const EPSILON = 0.00000001
const getRandomNum = (max) => Math.floor(Math.random() * (max-EPSILON))

function getAdjacentPositions(index) {
  let arr = [], i = Math.floor(index /4), j = index % 4

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

function Grid() {
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

  const shuffleArray = (numSwaps) => {
    console.log(numSwaps);


    let newTiles = ordered()
    while(numSwaps--){
        const indexOfZero  = newTiles.indexOf(0)
        console.log("indexOfZero", indexOfZero);
        const adjacent_positions = getAdjacentPositions(indexOfZero)
        console.log(adjacent_positions);
        const randomNum = getRandomNum(adjacent_positions.length); 
        const randomPosIndex = adjacent_positions[randomNum];// MUST KEEP THE SEMICOLON HERE IDK WHY
        [newTiles[indexOfZero], newTiles[randomPosIndex]] = [newTiles[randomPosIndex], newTiles[indexOfZero]]

    }
    //   for (let i = newTiles.length - 1; i > 0; i--) {
    //       const j = Math.floor(Math.random() * (i + 1));
    //       [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
    //   }
      setTiles(newTiles)
      setMoves(0)
  }


  return (
    <>
      <h1> 15 puzzle </h1>

      <div className="App">
        {
          tiles.map((x, i) => (
            <Tile key={i} onSelect={onSelect} value={x} index={i} disabled={winner} />
          ))
        }

        {winner &&
          <div className="play-again-div">
            <button className="play-again-btn" onClick={()=>{setWinner(false); setMoves(0)}}>Play Again</button>
          </div>}


      </div>

      <SideBar moves={moves} shuffleArray={shuffleArray}/>



    </>

  );
}

export default Grid;
