import React from 'react'
import Station from './station'

function RouteGraph(props) {
  const data = props.route_data
  const handleClick = props.handleClick

  return (
    <div className="route-graph-container">
      {
        // generate many stations
        // use <Station /> with your own customized parameters
        // coding here ...
		data.map((d, index) => <Station data={d} end={index === data.length - 1} handleClick={handleClick}/>)
      }
    </div>
  )
}

export default RouteGraph
