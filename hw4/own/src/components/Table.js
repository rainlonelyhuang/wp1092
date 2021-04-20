import React, { useState, useEffect } from "react";

function Table(){
	let s = [];
	for(let i = 0; i < 10; i++){
		s.push(<tr><td>February</td><td>February</td><td>February</td><td>February</td><td>February</td><td>February</td><td>February</td><td>February</td><td>February</td><td>February</td><td>February</td><td>February</td><td>February</td><td>February</td><td>February</td><td>February</td><td>$80</td></tr>);
	}
	return(
		<>
			<table>
  <thead>
    <tr>
      <th>Month</th>
      <th>Savings</th>
      <th>Month</th>
      <th>Savings</th>
      <th>Month</th>
      <th>Savings</th>
      <th>Month</th>
      <th>Savings</th>
      <th>Month</th>
      <th>Savings</th>
      <th>Month</th>
      <th>Savings</th>
      <th>Savings</th>
      <th>Savings</th>
      <th>Savings</th>
      <th>Savings</th>
      <th>Savings</th>
    </tr>
  </thead>
  <tbody>
	{s}
	{s}
	{s}
	{s}
	{s}
	{s}
	{s}
	{s}
	{s}
	{s}
	{s}
	{s}
	{s}
    {s}
	{s}
  </tbody>
</table>
		</>
	);
}

export default Table;