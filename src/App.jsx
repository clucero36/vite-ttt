import { useState, useEffect } from 'react'
import './App.css'

let BOARD = [
  ["00", "01", "02"], // index 0
  ["10", "11", "12"], // index 1
  ["20", "21", "22"]  // index 2
]

function App() {

  const [board, setBoard] = useState(BOARD);
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null)

  useEffect(() => {
    if (checkBoard() === true) {
      if (turn === 'X') setWinner('O');
      if (turn === 'O') setWinner('X');
    }
  }, [board])

  function checkBoard() {
    if ( (board[0][0] === board[0][1] && board[0][0] === board[0][2]) ||
         (board[0][0] === board[1][0] && board[0][0] === board[2][0]) ||
         (board[0][0] === board[1][1] && board[0][0] === board[2][2]) ||
         (board[0][1] === board[1][1] && board[0][1] === board[2][1]) ||
         (board[0][2] === board[1][2] && board[0][2] === board[2][2]) ||
         (board[1][0] === board[1][1] && board[1][0] === board[1][2]) ||
         (board[2][0] === board[2][1] && board[2][0] === board[2][2]) ) {
          return true;
        }
  }

  function handleClick(row, col) {
    setBoard(board.map((boardRow, rowIndex) => {
      if (rowIndex === row) {
        let newRow = [...boardRow]
        newRow[col] = turn;
        return newRow;
      }
      else {
        return boardRow
      }
    }))
    if (turn === 'X') setTurn ('O');
    if (turn === 'O') setTurn ('X');
  }

  if (winner === null) {
    return (
      <>
        {' '}
        {board.map((row, index) => 
          <div style={{'display': 'flex'}}>
            <BoardRow row={row} rowIndex={index} handleClick={handleClick}/>
          </div>
        )}
      </>
    )
  }
  else {
    return (
      <>
        {`Winner is ${winner}!`}
        {board.map((row, index) => 
          <div style={{'display': 'flex'}}>
            <BoardRow row={row} rowIndex={index} handleClick={handleClick}/>
          </div>
        )}
      </>
    )
  }

}

function BoardRow({ row, rowIndex, handleClick, checkBoard }) {

  return (
    <>
      {row.map((tile, colIndex) => 
        <Tile tile={tile} rowIndex={rowIndex} colIndex={colIndex} onClick={handleClick}/>
      )}
    </>
  )
}

function Tile({tile, rowIndex, colIndex, onClick}) {

  const [clicked, setClicked] = useState(false);

  return (
    clicked === true ? (
      <button disabled={clicked}>
        {tile}
      </button>
    ) : (
      <button onClick={() => {
        onClick(rowIndex, colIndex)
        setClicked(true);
      }}>
        {tile}
      </button>
    )
  )
}

export default App
