import React, {useState} from 'react'
import '../css/SideBar.css'

export const SideBar = ({moves, shuffleArray}) => {
    const [sliderVal, setSliderVal] = useState(5)


    return (
        <div className="sidebar">
            <h3> Moves : {moves}</h3>
            <button className="shuffle" onClick={() => shuffleArray(sliderVal)}> Shuffle</button>
            <input className="slider" type="range" min="1" max="20" value={sliderVal} onChange={(e) => setSliderVal(e.target.value)}/>
            <h4>Shuffles: {sliderVal}</h4>
        </div>

    )
}
