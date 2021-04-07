import React from "react"
import { useState } from 'react'

const AddTask = ({ onAdd, updateCounter }) => {

        const [text, setText] = useState('')

        const onSubmit = (e) => {
          e.preventDefault()

          if (!text) {
            alert('Please add a task')
            return 
          }

          onAdd({ text })
          updateCounter()

          setText('')
        }
        
        return (

                <form onSubmit={onSubmit} >
                        <input type='text' className="todo-app__input" placeholder="What needs to be done?"
                        value={text} onChange={(e) => setText(e.target.value)}>
                        </input>    
                </form>
        )
    
}

export default AddTask 
