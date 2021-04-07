import React from 'react'
import AddTask from "../components/AddTask"
import Tasks from "../components/Tasks"

const Section = ({ onAdd, tasks, onDelete, onClick, updateCounter, counterChange }) => {
    return (
        <section className="todo-app__main">
            <AddTask onAdd={onAdd} updateCounter={updateCounter}/>
            <Tasks tasks={tasks} onDelete={onDelete} onClick={onClick} counterChange={counterChange} />
        </section>
    )
}

export default Section