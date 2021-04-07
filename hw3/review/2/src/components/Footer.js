import React from 'react'
import Button from "../components/Button"
import ClearButton from "../components/ClearButton"
import CountList from "../components/CountList"

const Footer = ({ counter, cleanAll }) => {
    return (
        <footer className="todo-app__footer" id="todo-footer">
            <CountList counter={counter}/>
            <Button />
            <ClearButton cleanAll={cleanAll}/>
        </footer>
    )
}

export default Footer