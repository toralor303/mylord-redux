import React, { useState } from 'react';
import { connect } from 'react-redux';

import Dice from '../components/Dice';

const Gameboard = props => {
  const getRule = () => {
    const f = dice[0];
    const s = dice[1];

    if (f === s) {
      if (f === 6)
        return 'Pick a player to drink 6 times (you can pick yourself). When the player is done drinking, he or she becomes Lord. Any disrespect towards them gives them the right to make you drink once. They will now be called my Lord by everyone. They also get to invent a new rule and are responsible for making sure everyone respects it.';
      else
        return f === 1
          ? 'Pick a player to drink 1 time.'
          : 'Pick a player to drink ' + f + ' times.';
    }
    if (f !== s && (f === 3 || s === 3))
      return 'You are now the joker. You drink everytime someone rolls a 3. If they roll two, you drink twice. To free yourself from this curse you have to roll another single 3.';
    if (f + s === 7) return 'Cheers ! Everyone drinks !';
    if (f + s === 5) return 'The last person to say MyLord drinks';
    if (f + s === 3)
      return 'You get to choose a new joker. They will take the place of the current one if there is already one.';

    return 'Better luck next time.';
  };

  const randomNumbers = () => {
    getRule();
    return [Math.floor(Math.random() * 6 + 1), Math.floor(Math.random() * 6 + 1)];
  };

  const btnValues = { roll: 'Roll the dice !', next: 'Next player' };
  const [player, setPlayer] = useState(props.players[0]);
  const [dice, setDice] = useState(randomNumbers);
  const [rule, setRule] = useState(getRule());
  const [btn, setBtn] = useState(btnValues.roll);

  const nextTurn = () => {
    if (btn === btnValues.next) {
      setPlayer(() => {
        const index = props.players.indexOf(player);

        if (index === props.players.length) {
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
      <p>It's {'player'}'s turn !</p>
      <div className='diceBoard'>
        <Dice value={dice[0]} />
        <Dice value={dice[1]} />
      </div>
      <p style={{ height: '75px' }}>{rule}</p>
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
