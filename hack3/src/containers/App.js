import React, { useState, useEffect } from 'react'
import RouteGraph from '../components/routeGraph'
import StationInfo from '../components/stationInfo'
import axios from 'axios'
import '../styles/App.css'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT,
  withCredentials: true
})

function App() {
  // sample structure of data
  // data: {
  //   R: [],
  //   G: []
  // }
  const [data, setData] = useState({}) // all MRT station data
  const [current_station_id, setCurrentStationId] = useState('None') // station clicked by cursor
  const [start_station, setStartStation] = useState('') // station selected as the starting one
  const [end_station, setEndStation] = useState('') // station selected as the ending one
  const [distance, setDistance] = useState(-2) // distance shown on the screen
  const [current_data, setCurrentData] = useState('')

  const station_type = current_station_id[0] // R10, station_type = R
  const station_order = current_station_id.slice(1, current_station_id.length) // R10, station_order = 10
  const station_info = current_station_id[0] !== 'N' ? data[station_type][parseInt(station_order) - 1] : null // get certain station information

  const getStations = async () => {
    // fetch data from database via backend
    // coding here ...
	const stations = await instance.get('/getStations');
	setData(stations.data.data);
  }

  const calculateDistance = async () => {
    // send start and end stations to backend and get distance
    // coding here ...
  }

  // fetch data here after 1st render
  // coding here ...
	useEffect(() => {
		getStations();
	}, []);
  if (!Object.keys(data).length) {
    return (
      <div className="wrapper">
        <div className="welcome-title"><h1>Welcome to MRT Distance Calculator !</h1></div>
      </div>
    )
  }
	const showInfo = (data) => {
		setCurrentData(data);
	}
	const changeStart = (e) => {
		setStartStation(e.target.value);
	}
	const changeEnd = (e) => {
		setEndStation(e.target.value);
	}
  return (
    <div className="wrapper">
      <div className="welcome-title"><h1>Welcome to MRT Distance Calculator !</h1></div>
      <div className="calculator-container">
        <div className="mode-selector">
          
          <span id="start-station-span">起始站</span>
          <select id="start-select" className="start-station" onChange={changeStart}> {/* you should add both onChange and value to attributes */}
			  {Object.keys(data).map(k => 
            <optgroup label={k}>
				{data[k].map(d => 
				<option id={"start-group-" + d.station_id}>{d.station_name}</option>
				)}
			</optgroup>
			  )}
            {
              // generate options of all stations within option group
              // coding here ...
			  
            }
          </select>

          <span id="end-station-span">終點站</span>
          <select id="end-select" className="end-station" onChange={changeEnd}> {/* you should add both onChange and value to attributes */}
            {Object.keys(data).map(k => 
            <optgroup label={k}>
				{data[k].map(d => 
				<option id={"end-group-" + d.station_id}>{d.station_name}</option>
				)}
			</optgroup>
			  )}
            {
              // generate options of all stations within option group
              // coding here ...
            }
          </select>

          <button onClick={calculateDistance} id="search-btn">查詢距離</button>
          <span id="answer"> {/* you should add className to attributes */}
            {distance}
          </span>
          <span id="answer-postfix">KM</span>
        </div>

        <div className="route-graph-info-container">
		{Object.keys(data).map(k => <RouteGraph route_data={data[k]} handleClick={showInfo}/> )}{/* you should pass data to child component with your own customized parameters */}
          <StationInfo data={current_data}/> {/* you should pass data to child component with your own customized parameters */}
        </div>
        
      </div>
    </div>
  )
}

export default App
