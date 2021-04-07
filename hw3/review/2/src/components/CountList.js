import React, { useEffect } from 'react'
import { useState } from 'react'
const CountList = ({ counter }) => {

    //const [counter, setCounter] = useState(0)

    // count todos 
    //const countTODO = (tasks) => {
    //    tasks.map((task) => 
    //    task.cross === true ? setCounter(counter + 1): setCounter(counter - 1))
    //}   

    //useEffect( () => {
    //    tasks.map((task) => 
    //    task.cross === true ? setCounter(counter + 1): setCounter(counter - 1))
    //    console.log('hi')
    //})

    return (
        <div className="todo-app__total">
            {counter}
        </div>
    )
}

export default CountList