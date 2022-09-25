import React, { useState } from "react";

function  getInitialtate() {
  const state = {};
  for(let r = 0; r <3; r++){
    for(let c = 0; c < 3; c++){
      state[`${r}-${c}`] = null;
    }
  }

  return{}
}

const getKeyFromIndex = (index) => {
  const row = Math.floor(index / 3);
  const col = index % 3;
  return `${row}-${col}`;
}

const getLabel = (value) => {
  if(!value) {
    return null;
  } 

  return value > 0 ? 'O' : 'X';
}

let jogadorO = 0;
let jogadorX = 0;
let empate = 0;

function getWinner(v) {
  for(let r = 0; r <3; r++){
    for(let c = 0; c < 3; c++){
      const sumRow = 
      v[`${r}-${c}`] + 
      v[`${r}-${c+1}`] + 
      v[`${r}-${c + 2}`];

      if(sumRow === 3 || sumRow === -3) {
        return sumRow;
      }
      
      const sumCol = 
      v[`${r}-${c}`] + 
      v[`${r + 1}-${c}`] + 
      v[`${r + 2}-${c}`];
      if(sumCol === 3 || sumCol === -3) {
        return sumCol;
      }

      const sumDiagonal = 
      v[`${r}-${c}`] + 
      v[`${r + 1}-${c + 1}`] + 
      v[`${r + 2}-${c + 2}`];
      if(sumDiagonal === 3 || sumDiagonal === -3) {
        return sumDiagonal;
      }

      const sumReverseDiagonal = 
      v[`${r}-${c}`] + 
      v[`${r + 1}-${c - 1}`] + 
      v[`${r + 2}-${c - 2}`];
      if(sumReverseDiagonal === 3 || sumReverseDiagonal === -3) {
        return sumReverseDiagonal;
      }
    }
  }
  return null;
}

const Game = () => {
  const [values, setValues] = useState(getInitialtate);
  const [player, setPlayer] = useState(1);
  const [winner, setWinner] = useState(null);

  function handleClick(key) {
    if(winner || values[key]){
      return;
    }

    const newValues = {
      ...values,
      [key]: player
    }
    setValues(newValues);
    setPlayer(player * -1);
    const newWinner = getWinner(newValues);

    if(newWinner) {
      setWinner(newWinner > 0 ? 1 : -1);
    }
  }  

  
  function reset() {
    setWinner(null);
    setValues(getInitialtate);
    setPlayer(1);
    contador();
  }

  const itsAtie = Object.values(values).filter(Boolean).length === 9 && !winner;

  function contador () {
    if(itsAtie == true) {
      empate = empate + 1;
    } else if(winner > 0) {
      jogadorO = jogadorO + 1;
    } else {
      jogadorX = jogadorX + 1;
    }
  }


  return (
    <div className="Game">
      <div className="Game__board">
        {Array.from({length: 9}).map((_, index) => {
        const key = getKeyFromIndex(index);
        return (
          <button key={index} type="button" onClick={() => handleClick(key)}>
            {getLabel(values[key])}
          </button>
        )})}
      </div>
      {(winner || itsAtie) && (
        <div className="Game__menu">
          {winner ? (
            <p>O ganhador é: {winner > 0 ? 'O' : 'X'}</p>
            ) : <p>Houve um empate</p>}
            <button onClick={reset}>Reiniciar</button>
        </div>
      )}

      <div className="pontuacao">
        <h2>Pontuação</h2>
        <p>Player O = {jogadorO} Player X = {jogadorX} Empate = {empate} </p>
      </div>
    </div>

);}


export default Game;
