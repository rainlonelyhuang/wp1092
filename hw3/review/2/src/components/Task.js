import React, { useState } from 'react'


const Task = ({ task, onDelete, onClick, counterChange }) => {
    return (
        <li className="todo-app__item">
            <div class="todo-app__checkbox">
                <label for="2" style={ task.cross ? {backgroundColor: 'green'} : {}}
                onClick={() => onClick(task.id)}></label> 
            </div>
            <h1 class="todo-app__item-details" style={ task.cross ? {textDecoration: 'line-through', opacity: 0.5}: {}}>{task.text}</h1>
            <img src="./img/x.png" className="todo-app__item-x" onClick={ () => onDelete(task.id)} ></img>
            
        </li>
    )
}

export default Task 
