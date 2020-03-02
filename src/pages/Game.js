import React from 'react';
import Gameboard from '../components/Gameboard';

import styles from '../styling/game.module.scss';

const Game = () => {
  return (
    <div className={styles.container}>
      <img src='images/LogoMyLord.svg' className={styles.title} alt='MyLord logo' />
      <Gameboard />
    </div>
  );
};

export default Game;
