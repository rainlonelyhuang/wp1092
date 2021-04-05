import React from "react";

function Footer({left, shown, appSetFilter, appSetClearCompleted}){
	const handleClick = filter => {
		appSetFilter(filter);
		document.getElementById("all").style.backgroundColor = "";
		document.getElementById("active").style.backgroundColor = "";
		document.getElementById("completed").style.backgroundColor = "";
		document.getElementById(filter).style.backgroundColor = "gray";
	}
	if(shown === 0){
		return (null);
	}
	return(
		<>
			<footer class="todo-app__footer" id="todo-footer">
				<div class="todo-app__total">{left} left</div>
				<ul class="todo-app__view-buttons">
					<button id="all" onClick={() => handleClick("all")} style={{backgroundColor: "gray"}}>All</button>
					<button id="active" onClick={() => handleClick("active")}>Active</button>
					<button id="completed" onClick={() => handleClick("completed")}>Completed</button>
				</ul>
				<div class="todo-app__clean" style={shown - left === 0? {visibility: "hidden"}: {}}>
					<button onClick={() => appSetClearCompleted(true)}>Clear completed</button>
				</div>
			</footer>
		</>
	);
}

export default Footer;