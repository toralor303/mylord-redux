import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Popup from 'reactjs-popup';

import PlayerCard from './PlayerCard';

const Gameboard = props => {
  const randomNumbers = () => {
    return [Math.floor(Math.random() * 6 + 1), Math.floor(Math.random() * 6 + 1)];
  };

  const btnValues = { roll: 'Roll the dice !', next: 'Next player' };
  const [player, setPlayer] = useState(props.players[0]);
  const [dice, setDice] = useState(randomNumbers);
  const [btn, setBtn] = useState(btnValues.roll);

  const [rule, setRule] = useState('');
  const [lords, setLords] = useState([]);
  const [chooseLord, setChooseLord] = useState(true);
  const [chooseJoker, setChooseJoker] = useState(false);
  const [joker, setJoker] = useState(null);

  const addLord = player => {
    if (lords.length + 1 === props.players.length) {
      setLords([]);
    } else {
      setLords([...lords, player]);
    }
  };

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
          if (lords.length + 1 < props.players.length) {
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
      } else if (f + s === 7 || f + s === 5) {
        if (f + s === 7) setRule('Cheers ! Everyone drinks !');
        if (f + s === 5) setRule('The last person to say MyLord drinks');
      }
      if (f + s === 3) {
        setChooseJoker(true);
        setRule(
          'You get to choose a new joker. They will take the place of the current one if there is already one.'
        );
      }

      if (rule === '') setRule('Better luck next time.');
    }
  }, [dice, lords.length, props.players.length, rule, btn, btnValues.next]);

  const popupStyle = {
    color: 'red'
  };

  return (
    <>
      <Popup open={chooseJoker} modal>
        <>
          <h1>Choose the new Joker</h1>
          <p>
            You get to choose a new joker. They will take the place of the current one if
            there is already one.
          </p>
          {//Loop through the available players
          props.players
            .filter(player => player !== joker)
            .map(player => {
              return (
                <PlayerCard
                  key={player.id}
                  delete={false}
                  id={player.id}
                  name={player.name}
                  callback={setJoker}
                />
              );
            })}
        </>
      </Popup>
      <Popup open={chooseLord} modal>
        <>
          <h1>Choose the new Lord</h1>
          <p>
            You get to choose a new Lord. The chosen player has to drink 6 times to become
            Lord.
          </p>
          {//Loop through the available players
          props.players
            .filter(player => !lords.includes(player))
            .map(player => {
              return (
                <PlayerCard
                  key={player.id}
                  delete={false}
                  id={player.id}
                  name={player.name}
                  callback={addLord}
                />
              );
            })}
        </>
      </Popup>
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
