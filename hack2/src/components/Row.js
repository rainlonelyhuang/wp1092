import Grid from '../components/Grid'
export default function Row ({row, values, newgrids}) {
	let grids = [];
	
	for(let i = 0; i < 4; i++){
		grids.push(
			<Grid row={row} col={i} value={values[i]} newgrid={newgrids[i]} />
		);
	}
    return (
		<>
			<tr>
				{grids}
			</tr>
		</>
    );
};