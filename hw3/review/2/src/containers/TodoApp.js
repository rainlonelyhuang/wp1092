import { useState } from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import Section from "../components/Section"



const TodoApp = () => {

    const [counter, setCounter] = useState(0)

    const [tasks, setTasks] = useState([])
    
    // Delete Task
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
        setCounter(counter - 1)
    }

    // Add Task 
    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const newTask = { id, ...task }
        setTasks([...tasks, newTask])
    }

    // change button color to green
    const crossDone = (id) => {
       setTasks(
           tasks.map((task) => 
           task.id === id ? {...task, cross: !task.cross}: task
           )
       )
       
    }

  const updateCounter = () => {
    setCounter(counter + 1)
  }

  // for footer - clean button - clear the todo list 
  const cleanAll = () => {
      setTasks([])
  }

  const counterChange = (task) => {
        task.cross === true ? setCounter(counter - 1): setCounter(counter + 1) 
  }
    
    return (
            <>
                <Header text="todos" />
                <Section onAdd={addTask} tasks={tasks} onDelete={deleteTask} onClick={crossDone} updateCounter={updateCounter} counterChange={counterChange}/>
                <Footer counter={counter} cleanAll={cleanAll}/>
            </>
    );
   
}

export default TodoApp;
