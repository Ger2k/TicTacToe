import { useState,useEffect } from 'react'
import confetti from 'canvas-confetti'
import './App.css'
import { Square } from "./components/Square"
import { turns } from "./constants.js"
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'

function App() {
  const [board,setBoard] = useState( () => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn,setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? turns.x
  })

  //NULL = NO HAY GANADOR || FALSE = EMPATE
  const [winner,setWinner] = useState(null)

  

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(turns.x)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    //no actualizar posicion si ya tiene algo
    if(board[index] || winner) return


    //ACTUALIZAR EL TABLERO
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //CAMBIAR EL TURNO
    const newTurn = turn === turns.x ? turns.o : turns.x
    setTurn(newTurn)

    //GUARDAR PROGRESO
    window.localStorage.setItem('board',JSON.stringify(newBoard))
    window.localStorage.setItem('turn',newTurn)

    //REVISAR SI HAY GANADOR
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti({
        particleCount : 500,
        spread : 100
      })
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1> TIC TAC TOE </h1>
      <button onClick={resetGame}>Reset</button>
      <section className="game">
        {
          board.map((square,index) => {
            return (
              <Square 
              key={index} 
              index={index}
              updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={ turn === turns.x}>{turns.x}</Square>
        <Square isSelected={ turn === turns.o}>{turns.o}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>

    </main>
    
    
  )
}

export default App
