import { WINNER_COMBOS } from "../constants"
export const checkWinnerFrom = (boardToCheck) => {
    //REVISAMOS TODAS LAS COMBINACIONES GANADORAS PARA SABER SI HAY GANADOR
    for (const combo of WINNER_COMBOS) {
      const [a,b,c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    //SI NO HAY GANADOR
    return null
  }

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square != null)
}