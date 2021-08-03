import React from 'react'

export const Tile = ({ onSelect, index, value, disabled }) => {
    if (value !== 0)
        return <button
            className="tile"
            onClick={() => onSelect(index)}
            disabled={disabled}>
            {value}
        </button>


    return <div></div>
}
