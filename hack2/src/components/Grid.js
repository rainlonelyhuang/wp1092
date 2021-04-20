export default function Grid ({row, col, value, newgrid}) {
	
    const mapping = {'':"", 2:"NCTU", 4:"NYMU", 8:"NTU", 16:"UCSD", 32:"UBC", 64:"CUHK", 128:"UCLA", 256:"NYU",512:"UCB",1024:"HKUST", 2048:"UTokyo", 4096:"Columbia", 8192:"Yale", 16384:"Cambridge", 32768:"Stanford", 65536:"MIT"}
    let grid_id = `grid-${row}-${col}`;
    let value_id = `value-${row}-${col}`;
    let temp_class_name = `grid level-${value}` + (newgrid? ' school-fade-in': '');
	if(value === 0){
		value='';
	}

    // #########################
    // # 1 #2 Modify everything here (including the above one) yourself
    // #########################

    return (
        <td>
            <div className={temp_class_name} id={grid_id}>
                <div className="school-name  school-fade-in" id={value_id}>{mapping[value]}</div>
            </div>
        </td>
    );
}