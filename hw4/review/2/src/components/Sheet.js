import React from "react";

export default ({ infoArr, rowNum, colNum, selectedR, selectedC, textReady, handleKeyDown, handleEnter, handleChange, handleDoubleClick, handleClick, handleBlur }) => {
    const itoalpha = []
    itoalpha.push("");
    for (let i = 0; i < 26; i++)
        itoalpha.push(String.fromCharCode(65 + i));
    for (let i = 0; i < 26; i++)
        for(let j = 0; j < 26; j++)
            itoalpha.push(String.fromCharCode(65 + i) + String.fromCharCode(65 + j));

    const ths = [];
    ths.push(<th className="first-cell first-col"></th>)
    for (let i = 1; i <= colNum; i++) {
        ths.push(<th className={(selectedC === i) ? "th_is-selected" : "th_not-selected"}>{itoalpha[i]}</th>);
    }

    const makeInput = (i, j, data) => {
        return <input
                    type="text"
                    value={data}
                    autoFocus
                    onKeyUp={(e) => handleEnter(e, i, j)}
                    onChange={(e) => handleChange(e, i, j)}
                    onBlur={() => handleBlur(i, j)}
                />
    }

    const trs = [];
    for (let i = 1; i <= rowNum; i++) {
        const tds = [];
        tds.push(<th scope="row" className={"first-col" + ((selectedR === i) ? " th_is-selected" : " th_not-selected")}>{i}</th>)
        for (let j = 1; j <= colNum; j++) {
            const isSelected = selectedR === i && selectedC === j;
            tds.push(<td 
                id={"" + i + "," + j}
                tabIndex={"" + i + "," + j}
                className={isSelected ? "td_is-selected" : ""}
                onDoubleClick={() => handleDoubleClick(i, j)} 
                onClick={() => handleClick(i, j)}
                onKeyDown={() => (isSelected && !textReady) ? handleKeyDown(i, j) : {}}
                onBlur={() => (isSelected && !textReady) ? handleBlur(i, j) : {}}
            >{(isSelected && textReady) ? makeInput(i, j, infoArr[i][j].data) : infoArr[i][j].data}</td>)
        }
        trs.push(<tr>{tds}</tr>)
    }


    return (
        <table className="table-wrapper">
            <thead>
                {ths}
            </thead>
            <tbody>
                {trs}
            </tbody>
        </table>
    )
}
