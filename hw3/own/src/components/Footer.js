import React from "react";

function Footer({left, shown, appSetFilter, appSetClearCompleted}){
	const handleClick = filter => {
		appSetFilter(filter);
		document.getElementById("all").style.border = "none";
		document.getElementById("active").style.border = "none";
		document.getElementById("completed").style.border = "none";
		document.getElementById(filter).style.border = "2px solid black";
	}
	if(shown === 0){
		return (null);
	}
	return(
		<>
			<footer class="todo-app__footer" id="todo-footer">
				<div class="todo-app__total">{left} left</div>
				<ul class="todo-app__view-buttons">
					<button id="all" onClick={() => handleClick("all")} style={{border: "2px solid black"}}>All</button>
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