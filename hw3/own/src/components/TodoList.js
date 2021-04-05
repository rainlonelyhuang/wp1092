import React, { useState, useEffect } from "react";

let completed = 0;
let shown = 0;
function TodoList({items, appSetLeft, appSetShown, appDeleteItem, clearCompleted, appClear, filter}){
	const [complete, setComplete] = useState([]);
	const deletedStyle = {textDecoration: "line-through", opacity: "0.5"};
	const noDisplayStyle = {display: "none"};
	useEffect(() => {
		shown = items.length;
		appSetLeft(shown - completed);
		appSetShown(shown);
	}, [items]);
	const handleClick = (id) => {
		let c = [...complete];
		c[id] = !c[id];
		setComplete(c);
		if(c[id]){
			completed++;
		}
		else{
			completed--;
		}
		appSetLeft(shown - completed);
		//console.log(complete);
	}
	const handleX = (id) => {
		if(complete[id]){
			completed--;
		}
		appDeleteItem(id);
	}
	const display = (id) => {
		if(filter === "active"){
			return !complete[id];
		}
		if(filter === "completed"){
			return complete[id];
		}
		return true;
	}
	if(clearCompleted){
		let ids = [];
		for(let i = 0; i < items.length; i++){ 
			if(complete[items[i].id] === true){
				completed--;
				ids.push(items[i].id);
			}
		}
		appClear(ids);
	}
	if(shown === 0){
		return (null);
	}
	return(
		<>
			<ul class="todo-app__list" id="todo-list">
				{items.map(item => (
					<li class="todo-app__item" key={item.id} style={display(item.id)? {}: noDisplayStyle}>
						<div class="todo-app__checkbox">
							<input type="checkbox" id={item.id} onClick={() => handleClick(item.id)} />
							<label htmlFor={item.id} />
						</div>
						<h1 class="todo-app__item-detail" style={complete[item.id]? deletedStyle: {}}>{item.text}</h1>
						<img src="./img/x.png" class="todo-app__item-x" onClick={() => handleX(item.id)} />
					</li>
				))}
			</ul>
		</>
	);
}

export default TodoList;