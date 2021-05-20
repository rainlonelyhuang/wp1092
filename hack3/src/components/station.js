import React from 'react'

function Station(props) {
	const data = props.data;
	const handleClick = props.handleClick;
	const station_id = `s-${data.station_id}`;
	const line_id = `l-${data.station_id}`;
	let color;
	if(data.station_type === 'R') color = ' red';
	if(data.station_type === 'G') color = ' green';
	if(data.station_type === 'O') color = ' orange';
	if(data.station_type === 'B') color = ' blue';
	const end = (data.station_order === 1 || props.end)? ' end': ''
  return (
    <div className="station-line-container">
      <div className="station-and-name color" id={station_id} onClick={() => handleClick(data)}> {/* you should add both id and onClick to attributes */}
        <div className={"station-rectangle" + color + end}>{data.station_id}</div>
        <div className="station-name">{data.station_name}</div>
      </div>
      {props.end? null: <div className={"line" + color} id={line_id}></div>} {/* you should add both id to attributes */}
    </div>
  )
}

export default Station
