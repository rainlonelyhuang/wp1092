import Row from './Row'

export default function Board2048 ({ board, gameover, win, newgame }) {

    let boardClassName = gameover || win? 'board game-over-board': 'board';
    let infoClassName = gameover || win? 'info game-over-wrapper end-fade-in': 'info';
    let outSentence = "No funding this year QAO";
    let phdSentence = "You should study a PhD!";
    return (
        <>
        <table className={boardClassName} id='board-full' >
            <tbody>
                {board.map((row_vector, row_idx) => (<Row key={row_idx} row={row_idx} values={row_vector} />))}
            </tbody>
        </table>
        <div className={infoClassName} id='game-over-info'>
            <span id="game-over-text">{win? phdSentence: outSentence}</span>
            <div className="button" id="game-over-button" onClick={newgame}>Try again</div>
        </div>
        </>
    );
};