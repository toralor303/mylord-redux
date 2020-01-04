import React from 'react';

import Dice from '../components/Dice';

const Gameboard = () => {
  const btnValues = { roll: 'Roll the dice !', next: 'Next player' };

  const randomNumbers = [
    Math.floor(Math.random() * 6 + 1),
    Math.floor(Math.random() * 6 + 1)
  ];

  return (
    <>
      <p>It's {'Some player'}'s turn !</p>
      <div className='diceBoard'>
        <Dice value={randomNumbers[0]} />
        <Dice value={randomNumbers[1]} />
      </div>
      <p>{'This is a rule'}</p>
      <button onClick={console.log('Clic !')}>{btnValues}</button>
    </>
  );
};

export default Gameboard;
