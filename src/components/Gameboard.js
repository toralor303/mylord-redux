import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';

const Gameboard = () => {
  const randomNumbers = () => {
    return [Math.floor(Math.random() * 6 + 1), Math.floor(Math.random() * 6 + 1)];
  };

  const players = JSON.parse(localStorage.getItem('players'));
  const btnValues = { roll: 'Roll the dice !', next: 'Next player' };
  const [player, setPlayer] = useState(players[0]);
  const [dice, setDice] = useState(randomNumbers);
  const [btn, setBtn] = useState(btnValues.roll);

  const [rule, setRule] = useState('');
  const [lords, setLords] = useState([]);
  const [chooseLord, setChooseLord] = useState(false);
  const [chooseJoker, setChooseJoker] = useState(false);
  const [joker, setJoker] = useState(null);

  const addLord = player => {
    if (lords.length + 1 === players.length) {
      setLords([]);
    } else {
      setLords([...lords, player]);
    }
  };

  const nextTurn = () => {
    if (btn === btnValues.next) {
      setPlayer(() => {
        const index = players.indexOf(player);

        if (index === players.length - 1) {
          return players[0];
        } else {
          return players[index + 1];
        }
      });
      setBtn(btnValues.roll);
      setRule('');
    } else {
      setDice(randomNumbers);
      setBtn(btnValues.next);
    }
  };

  useEffect(() => {
    if (btn === btnValues.next) {
      const f = dice[0];
      const s = dice[1];

      //Two same numbers
      if (f === s) {
        //Two sixes...
        if (f === 6) {
          //If adding a new Lord doesn't mean all players will be Lords
          if (lords.length + 1 < players.length) {
            setChooseLord(true);
            setRule(
              'Pick a player to drink 6 times (you can pick yourself). When the player is done drinking, he or she becomes Lord. Any disrespect towards them gives them the right to make you drink once. They will now be called my Lord by everyone. They also get to invent a new rule and are responsible for making sure everyone respects it.'
            );
          }
          //If only one player is not Lord, all Lords loose their status
          else {
            setLords([]);
            setRule(
              'All lords loose their status and become regular players again. The rules set by the lords still apply.'
            );
          }
        } else
          setRule(
            f === 1 //Ternary to handle the plural
              ? 'Pick a player to drink 1 time.'
              : 'Pick a player to drink ' + f + ' times.'
          );
      }
      if (f === 3 || s === 3) {
        const both = f + s === 6;
        //Rolled at least one 3
        if (joker != null) {
          //There is a joker
          if (joker !== player) {
            //The joker is not the current player
            setRule('The joker has to drink ' + (f + s === 6 ? '1 time' : '2 times'));
          } //The joker is the current player
          else {
            setRule(
              both
                ? " You rolled 3 twice while being the joker. You don't have to drink, but you are still the joker. Roll a single 3 to stop being the joker."
                : ' You rolled a single 3, you are no longer the joker.'
            );
            if (!both) setJoker(null);
          }
        } //No joker currently
        else {
          setRule(both ? rule : 'You rolled a 3, you are now the joker !');
          setJoker(player);
        }
      }
      if (f + s === 7) setRule('Cheers ! Everyone drinks !');
      if (f + s === 5) setRule('The last person to say MyLord drinks');

      if (f + s === 3) {
        setChooseJoker(true);
        setRule(
          'You get to choose a new joker. They will take the place of the current one if there is already one.'
        );
      }

      if (rule === '') setRule('Better luck next time.');
    }
  }, [dice, lords.length, players.length, rule, btn, btnValues.next, joker, player]);

  return (
    <>
      <Modal
        players={players.filter(player => player !== joker)}
        role='joker'
        open={chooseJoker}
        callback={setJoker}
      />
      <Modal
        players={players.filter(player => !lords.includes(player))}
        role='lord'
        open={chooseLord}
        callback={addLord}
      />
      <p>It's {player ? player.name : 'Your mom'}'s turn !</p>
      <div className='diceBoard'>
        <img alt={dice[0]} src={'images/' + dice[0] + '.svg'} className='dice' />
        <img alt={dice[1]} src={'images/' + dice[1] + '.svg'} className='dice' />
      </div>
      <p>{rule}</p>
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
