import React, { useState, useEffect } from "react";
import Sheet from "../components/Sheet";

export default () => {
    const [rowNum, setRowNum] = useState(100);
    const [colNum, setColNum] = useState(26);
    const [selectedR, setSelectedR] = useState(-1);
    const [selectedC, setSelectedC] = useState(-1);

    let initInfo = (r, c) => {
        return {
            "r" : r,
            "c" : c,
            "data": ""
        };
    };
    
    const initialInfo = [];
    
    for (let i = 0; i < rowNum + 1; i++) {
        initialInfo[i] = [];
        for (let j = 0; j < colNum + 1; j++) {
            initialInfo[i][j] = initInfo(i, j);
        }
    }
    const [infoArr, setInfoArr] = useState(initialInfo);
    const [textReady, setTextReady] = useState(false);

    const handleDoubleClick = (r, c) => {
        setSelectedR(r);
        setSelectedC(c);
        setTextReady(true);
    }

    const handleClick = (r, c) => {
        document.getElementById("" + r + "," + c).focus();
        setSelectedR(r);
        setSelectedC(c);
        setTextReady(false);
    }

    const handleKeyDown = (r, c) => {
        const newInfoArr = [...infoArr];
        newInfoArr[r][c].data = "";
        setInfoArr(newInfoArr);
        setTextReady(true);
    }

    const handleEnter = ({ key }, r, c) => {
        if ((key === 'Enter') && (r !== rowNum))
            setSelectedR(r + 1);
    }

    const handleChange = ({ target }, r, c) => {
        const { value } = target;
        const newInfoArr = [...infoArr];
        newInfoArr[r][c].data = value;
        setInfoArr(newInfoArr);
    };

    const [prevR, setPrevR] = useState(-1);
    const [prevC, setPrevC] = useState(-1);

    const handleBlur = () => {
        setSelectedR(-1);
        setSelectedC(-1);
    }


    const handleRowAdd = () => {
        const newRow = [];
        const rowIndex = (selectedR !== -1) ? selectedR : rowNum + 1;
        for (let j = 0; j < colNum + 1; j++)
            newRow.push(initInfo(rowIndex, j));
        const newInfoArr = [...infoArr];
        newInfoArr.splice(rowIndex, 0, newRow);
        setPrevR(selectedR);
        setPrevC(selectedC);
        setRowNum(rowNum + 1);
        setInfoArr(newInfoArr);
    }

    useEffect(() => {
        if (prevR !== -1) {
            const newR = prevR + 1
            document.getElementById("" + newR + "," + prevC).focus();
            setSelectedR(newR);
            setSelectedC(prevC);
        }
    }, [rowNum]);

    const handleRowDelete = () => {
        if (rowNum <= 2) {
            alert("The minimum number of rows is 2.")
        } else if (selectedR !== -1) {
            const newInfoArr = [...infoArr];
            newInfoArr.splice(selectedR, 1);
            setPrevR(-1);
            setPrevC(-1);
            setRowNum(rowNum - 1);
            setInfoArr(newInfoArr);
        }
    }

    const handleColAdd = () => {
        const colIndex = (selectedC !== -1) ? selectedC : colNum + 1;
        const newInfoArr = [...infoArr];
        newInfoArr.map((row, index) => {
            row.splice(colIndex, 0, initInfo(index, colIndex));
            return row;
        })
        setPrevR(selectedR);
        setPrevC(selectedC);
        setColNum(colNum + 1);
        setInfoArr(newInfoArr);
    }

    useEffect(() => {
        if (prevC !== -1) {
            const newC = prevC + 1
            document.getElementById("" + prevR + "," + newC).focus();
            setSelectedR(prevR);
            setSelectedC(newC);
        }
    }, [colNum]);

    const handleColDelete = () => {
        if (colNum <= 2) {
            alert("The minimum number of columns is 2.")
        } else if (selectedC !== -1) {
            const newInfoArr = [...infoArr];
            newInfoArr.map((row, index) => {
                row.splice(selectedC, 1);
                return row;
            })
            setPrevR(-1);
            setPrevC(-1);
            setColNum(colNum - 1);
            setInfoArr(newInfoArr);
        }
    }

    return (
        <div id="root">
            <div class="wrapper">
                <div class="c0">
                    <button style={{marginTop: "60px"}} onMouseDown={handleRowAdd}>+</button><br />
                    <button onMouseDown={handleRowDelete}>-</button>
                </div>
                <div>
                    <div class="r0">
                        <button style={{marginLeft: "100px"}} onMouseDown={handleColAdd}>+</button>
                        <button onMouseDown={handleColDelete}>-</button>
                    </div>
                    <Sheet
                        infoArr={infoArr}
                        rowNum={rowNum}
                        colNum={colNum}
                        selectedR={selectedR}
                        selectedC={selectedC}
                        textReady={textReady}
                        handleKeyDown={handleKeyDown}
                        handleEnter={handleEnter}
                        handleChange={handleChange}
                        handleDoubleClick={handleDoubleClick}
                        handleClick={handleClick}
                        handleBlur={handleBlur}
                    />
                </div>
            </div>
        </div>
    );
}


