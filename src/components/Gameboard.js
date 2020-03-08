import React, { useState, useEffect } from 'react';
import styles from '../styling/gameboard.module.scss';

const Gameboard = props => {
  const btnValues = { roll: 'Roll the dice !', next: 'Next player' };
  const [player, setPlayer] = useState(props.players[0]);
  const [btn, setBtn] = useState(btnValues.roll);
  const [turn, setTurn] = useState(1);

  const [rule, setRule] = useState('Better luck next time.');

  const nextTurn = () => {
    if (btn === btnValues.next) {
      setPlayer(() => {
        const index = props.players.findIndex(searchingPlayer => {
          return player.id === searchingPlayer.id;
        });

        if (index === props.players.length - 1) {
          return props.players[0];
        } else {
          return props.players[index + 1];
        }
      });
      setBtn(btnValues.roll);
      setRule('');
    } else {
      setBtn(btnValues.next);
    }

    setTurn(turn + 1);
  };

  useEffect(() => {
    if (btn === btnValues.next) {
      const f = props.dice[0];
      const s = props.dice[1];

      //Two same numbers
      if (f === s) {
        //Two sixes...
        if (f === 6) {
          //If adding a new Lord doesn't mean all players will be Lords
          if (props.lords.length + 1 < props.players.length) {
            props.setChooseLord(true);
            setRule(
              'Pick a player to drink 6 times (you can pick yourself). When the player is done drinking, he or she becomes Lord. Any disrespect towards them gives them the right to make you drink once. They will now be called my Lord by everyone. They also get to invent a new rule and are responsible for making sure everyone respects it.'
            );
          }
          //If only one player is not Lord, all Lords loose their status
          else {
            props.setLords([]);
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
        if (props.joker != null) {
          //There is a joker
          if (props.joker !== player) {
            //The joker is not the current player
            setRule('The joker has to drink ' + (f + s === 6 ? '1 time' : '2 times'));
          } //The joker is the current player
          else {
            setRule(
              both
                ? " You rolled 3 twice while being the joker. You don't have to drink, but you are still the joker. Roll a single 3 to stop being the joker."
                : ' You rolled a single 3, you are no longer the joker.'
            );
            if (!both) localStorage.setItem('joker', null);
          }
        } //No joker currently
        else {
          if (props.joker !== null) {
            if (props.joker.turn !== turn) {
              setRule(r => (both ? r : 'You rolled a 3, you are now the joker !'));
              localStorage.setItem('joker', { turn, player });
            }
          }
        }
      }
      if (f + s === 7) setRule('Cheers ! Everyone drinks !');
      if (f + s === 5) setRule('The last person to say MyLord drinks');

      if (f + s === 3) {
        props.setChooseJoker(true);
        setRule(
          'You get to choose a new joker. They will take the place of the current one if there is already one.'
        );
      }
    }
  }, [props, btn, btnValues.next, player, turn]);

  return (
    <>
      <p className={styles.turn}>
        Player :<br /> {player.name}
      </p>
      <div className={styles.diceContainer}>
        <img
          alt={props.dice[0]}
          src={'images/' + props.dice[0] + '.svg'}
          className={styles.dice}
        />
        <img
          alt={props.dice[1]}
          src={'images/' + props.dice[1] + '.svg'}
          className={styles.dice}
        />
      </div>
      <p className={styles.rule}>{rule}</p>
      <button
        className={styles.btn}
        onClick={() => {
          nextTurn();
        }}>
        {btn}
      </button>
    </>
  );
};

export default Gameboard;
