import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TodoList from "../components/TodoList";
import Footer from "../components/Footer";

let n = 0;
function TodoApp(){
	const [items, setItems] = useState([]);
	const [left, setLeft] = useState();
	const [shown, setShown] = useState();
	const [filter, setFilter] = useState("all");
	const [clearCompleted, setClearCompleted] = useState(false);
	
	const handleSubmit = (e) => {
		const input = document.getElementById("new-todo");
		const txt = input.value.trim();
		if(e.key === "Enter" && txt.length !== 0){
			//console.log(txt);
			input.value = "";
			const item = {text: txt, id: n};
			n++;
			//console.log(n);
			setItems(items.concat(item));
		}
	}
	const deleteItem = (id) => {
		const its = [...items];
		const index = its.findIndex(i => i.id === id);
		its.splice(index, 1);
		setItems(its);
		if(its.length === 0){
			setFilter("all");
		}
	}
	const clear = (ids) => {
		const its = [...items];
		for(let i = 0; i < ids.length; i++){
			const index = its.findIndex(it => it.id === ids[i]);
			its.splice(index, 1);
		}
		setItems(its);
		if(its.length === 0){
			setFilter("all");
		}
	}
	useEffect(() => {
		if(clearCompleted){
			setClearCompleted(false);
		}
	}, [clearCompleted]);
	return (
		<>
			<Header text="todos" />
			<section class="todo-app__main">
				<input class="todo-app__input" id="new-todo" placeholder="What needs to be done?" onKeyPress={handleSubmit}/>
				<TodoList items={items} appSetLeft={setLeft} appSetShown={setShown} appDeleteItem={deleteItem} clearCompleted={clearCompleted} appClear={clear} filter={filter}/>
			</section>
			<Footer left={left} shown={shown} appSetFilter={setFilter} appSetClearCompleted={setClearCompleted} />
		</>
	);
}

export default TodoApp;
