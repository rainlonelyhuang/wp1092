import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Table from "../components/Table";

function FakeSheet() {
	const [focus, setFocus] = useState([-1, -1]);
	const [editTable, setEditTable] = useState([0, 0, 0])
	const addCol = () => {
		if(focus[0] > 0){
			setEditTable([1, 0, focus[1]]);
		}
		else{
			setEditTable([1, 0, -1]);
		}
	}
	const delCol = () => {
		if(focus[0] > 0){
			setEditTable([-1, 0, focus[1]]);
		}
	}
	const addRow = () => {
		if(focus[0] > 0){
			setEditTable([1, focus[0], 0]);
		}
		else{
			setEditTable([1, -1, 0]);
		}
	}
	const delRow = () => {
		if(focus[0] > 0){
			setEditTable([-1, focus[0], 0]);
		}
	}
	return (
		<>
			<Header />
			<div style={{marginLeft: '80px', height: '30px'}}>
				<button style={{width: '25px', height: '25px'}} onClick={addCol}>+</button>
				<button style={{width: '25px', height: '25px'}} onClick={delCol}>-</button>
			</div>
			<div style={{display: 'flex', alignItems: 'stretch'}}>
				<div style={{marginTop: '30px', width: '30px'}}>
					<button style={{width: '25px', height: '25px'}} onClick={addRow}>+</button>
					<button style={{width: '25px', height: '25px'}} onClick={delRow}>-</button>
				</div>
				<Table key='table' setFocus={setFocus} editTable={editTable} setEditTable={setEditTable}/>
			</div>
		</>
	);
}

export default FakeSheet;

