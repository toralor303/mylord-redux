import React, { useState } from 'react';
import Gameboard from '../components/Gameboard';
import Modal from '../components/Modal';

import styles from '../styling/game.module.scss';

const Game = () => {
  const randomNumbers = () => {
    return [6, 6]; //[Math.floor(Math.random() * 6 + 1), Math.floor(Math.random() * 6 + 1)];
  };

  const [chooseLord, setChooseLord] = useState(false);
  const [chooseJoker, setChooseJoker] = useState(false);
  const [players, setPlayers] = useState(JSON.parse(localStorage.getItem('players')));
  const [joker, setJoker] = useState(null);
  const [lords, setLords] = useState([]);

  const addLord = player => {
    console.log(`It worked ! New Lord is: ${player}`);
    if (lords.length + 1 === players.length) {
      setLords([]);
    } else {
      setLords([...lords, player]);
    }
  };

  return (
    <div className={styles.container}>
      <Modal
        players={players.filter(player => player !== joker)}
        role='joker'
        open={chooseJoker}
        callback={newJoker => {
          localStorage.setItem('joker', newJoker);
          setJoker(newJoker);
        }}
      />
      <Modal
        players={players.filter(player => !lords.includes(player))}
        role='lord'
        open={chooseLord}
        callback={newLord => {
          addLord(newLord);
        }}
      />
      <img src='images/LogoMyLord.svg' className={styles.title} alt='MyLord logo' />
      <Gameboard
        dice={randomNumbers()}
        setChooseJoker={open => setChooseJoker(open)}
        setChooseLord={open => {
          console.log('setChooseLord had been trigerred! ' + open);
          setChooseLord(open);
        }}
        players={players}
        joker={joker}
        lords={lords}
      />
    </div>
  );
};

export default Game;
