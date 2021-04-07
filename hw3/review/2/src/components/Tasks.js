import React from 'react'

import Task from './Task'


const Tasks = ({ tasks, onDelete, onClick, counterChange }) => {



    return (
        <ul className="todo-app__list" id="todo-list">
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onClick={onClick} counterChange={counterChange}/>
            ))} 
        </ul>
    )
}

export default Tasks
