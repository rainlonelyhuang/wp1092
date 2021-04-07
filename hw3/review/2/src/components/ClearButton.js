import React from 'react'

const ClearButton = ({ cleanAll }) => {
    return (
        <div className="todo-app__clean">
            <button onClick={ ()=> cleanAll()}>Clear completed</button>
        </div>
    )
}

export default ClearButton
