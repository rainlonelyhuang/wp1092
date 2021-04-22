import React, { useState, useEffect, useRef } from "react";

const selectedStyle = {border: '2px solid #448ee4'};
function Cell({row_id, col_id, setFocus, values, setValues, timerID, setTimerID}){
	const [selected, setSelected] = useState(false);
	const [editing, setEditing] = useState(false);
	const [style, setStyle] = useState({});
	const input = useRef();
	const setValue = (v) => {
		let vs = [...values];
		vs[row_id][col_id] = v;
		setValues(vs);
	}
	const colorCross = (color) => {
		let row_items = document.getElementsByClassName(`row-${row_id}`);
		for(let i = 0; i < row_items.length; i++){
			row_items.item(i).style.backgroundColor = color;
		}
		let col_items = document.getElementsByClassName(`col-${col_id}`);
		for(let i = 0; i < col_items.length; i++){
			col_items.item(i).style.backgroundColor = color;
		}
	}
	const handleFocus = () => {
		setSelected(true);
		setFocus([row_id, col_id]);
		if(timerID >= 0){
			clearTimeout(timerID);
			setTimerID(-1);
		}
	}
	const handleDoubleClick = () => {
		setEditing(true);
		setStyle(selectedStyle);
		setSelected(true);
	}
	const handleBlur = () => {
		if(editing){
			setValue(input.current.value);
			setEditing(false);
		}
		setSelected(false);
		colorCross('');
		let id = setTimeout(() => {
			setFocus([-1, -1]);
		}, 500);
		setTimerID(id);
	}
	useEffect(() => {
		if(editing){
			input.current.focus();
			input.current.value = values[row_id][col_id];
		}
	}, [editing]);
	const handleSpanKeyDown = (e) => {
		if(selected && !editing && e.key && (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Enter')){
			if(e.key === 'Backspace' || e.key === 'Delete'){
				setEditing(true);
				setStyle(selectedStyle);
				setValue('');
			}
			else if(e.key === 'Enter'){
				handleInputKeyDown(e);
			}
			else{
				setEditing(true);
				setStyle(selectedStyle);
				setValue(e.key);
			}
		}
	}
	const handleInputKeyDown = (e) => {
		if(selected && e.key === 'Enter'){
			if(editing){
				setEditing(false);
				setStyle({});
				setValue(input.current.value);
			}
			if(row_id + 1 < values.length){
				setSelected(false);
				colorCross('');
				setTimeout(() => {document.getElementsByClassName(`row-${row_id+1} col-${col_id}`)[0].focus();}, 100);
			}
		}
	}
	if(editing || selected){
		colorCross('#dddddd');
	}
	if(editing){
		return(
			<td className={`row-${row_id} col-${col_id}`} style={style}>
				<input ref={input} onKeyDown={handleInputKeyDown} onBlur={handleBlur}/>
			</td>
		);
	}
	return(
		<td className={`row-${row_id} col-${col_id}`} onFocus={handleFocus} onDoubleClick={handleDoubleClick} tabIndex="0" onKeyDown={handleSpanKeyDown} onBlur={handleBlur}>
			<span className='no_selection' style={{marginLeft: '5px'}}>{values[row_id][col_id]}</span>
		</td>
	);
}

export default Cell;