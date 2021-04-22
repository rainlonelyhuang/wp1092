import React, { useState, useEffect } from "react";
import Cell from './Cell'

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));
function Table({setFocus, editTable, setEditTable}){
	const initValues = () => {
		let init_values = Array(100 + 1);
		for(let i = 0; i < init_values.length; i++){
			init_values[i] = Array(26 + 1).fill('');
		}
		return init_values;
	}
	const [values, setValues] = useState(initValues());
	const [timerID, setTimerID] = useState(-1);
	const itoa = (x) => {
		let ret = '';
		if(x > 25){
			while(x > 25){
				ret = alphabet[x % 26] + ret;
				x = Math.floor(x / 26);
			}
			ret = alphabet[x - 1] + ret;
		}
		else{
			ret = alphabet[x] + ret;
		}
		return ret;
	}
	
	useEffect(() => {
		if(editTable[0] < 0){ // delete row/col
			if(editTable[1] === 0){ // col
				let vs = [...values];
				for(let i = 0; i < values.length; i++){
					vs[i].splice(editTable[2], 1);
				}
				setValues(vs);
			}
			if(editTable[2] === 0){ // row
				let vs = [...values];
				vs.splice(editTable[2], 1);
				setValues(vs);
			}
			setEditTable([0, 0, 0]);
		}
		if(editTable[0] > 0){ // add row/col
			if(editTable[1] === 0){ // col
				let vs = [...values];
				let id = 0;
				if(editTable > 0){
					id = values[0].length;
				}
				else{
					id = editTable[2];
				}
				for(let i = 0; i < values.length; i++){
					vs[i].splice(id, 0, '');
				}
				setValues(vs);
			}
			if(editTable[2] === 0){ // row
				let vs = [...values];
				let id = 0;
				if(editTable > 0){
					id = values[0].length;
				}
				else{
					id = editTable[2];
				}
				vs.splice(id, 0, Array(values[0].length).fill(''));
				setValues(vs);
			}
			setEditTable([0, 0, 0]);
		}
	}, editTable);
	let thead = [];
	thead.push(<th></th>)
	for(let i = 1; i < values[0].length; i++){
		thead.push(<th className={`col-${i}`}>{itoa(i-1)}</th>);
	}
	let cells = [];
	for(let i = 1; i < values.length; i++){
		let rows = [];
		rows.push(<td className={`row-${i}`}>{i}</td>);
		for(let j = 1; j < values[i].length; j++){
			rows.push(<Cell key={`cell-${i}-${j}`} row_id={i} col_id={j} setFocus={setFocus} values={values} setValues={setValues} timerID={timerID} setTimerID={setTimerID}/>);
		}
		cells.push(<tr>{rows}</tr>);
	}
	return(
		<>
			<div className='tableDiv'>
				<table>
					<thead>
						<tr>{thead}</tr>
					</thead>
					<tbody>
						{cells}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default Table;