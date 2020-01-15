import React, { useState } from 'react';
import { connect } from 'react-redux';

import Dice from '../components/Dice';
import Rule from '../components/Rule';

const Gameboard = props => {
  const randomNumbers = () => {
    return [Math.floor(Math.random() * 6 + 1), Math.floor(Math.random() * 6 + 1)];
  };

  const btnValues = { roll: 'Roll the dice !', next: 'Next player' };
  const [player, setPlayer] = useState(props.players[0]);
  const [dice, setDice] = useState(randomNumbers);
  const [btn, setBtn] = useState(btnValues.roll);

  const nextTurn = () => {
    if (btn === btnValues.next) {
      setPlayer(() => {
        const index = props.players.indexOf(player);

        if (index === props.players.length - 1) {
          return props.players[0];
        } else {
          return props.players[index + 1];
        }
      });
      setBtn(btnValues.roll);
    } else {
      setDice(randomNumbers);

      setBtn(btnValues.next);
    }
  };

  return (
    <>
      <p>It's {player.name}'s turn !</p>
      <div className='diceBoard'>
        <Dice value={dice[0]} />
        <Dice value={dice[1]} />
      </div>
      <Rule dice={dice} currentPlayer={player} playerCount={props.players.length} />
      <button
        onClick={() => {
          nextTurn();
        }}>
        {btn}
      </button>
    </>
  );
};

function mapStateToProps(state) {
  return {
    players: state.players
  };
}

export default connect(mapStateToProps)(Gameboard);
