import React, { useState } from 'react';
import { connect } from 'react-redux';

import Modal from 'react-bootstrap/Modal';

import PlayerCard from './PlayerCard';
import Dice from '../components/Dice';

import * as ruleActions from '../redux/actions/ruleActions';
import { bindActionCreators } from 'redux';

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
  const [chooseLord, setChooseLord] = useState(false);
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
    } else {
      setDice(randomNumbers);
      getRule(dice);
      setBtn(btnValues.next);
    }
  };

  const getRule = () => {
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

    if (rule === '') return 'Better luck next time.';

    return rule;
  };

  return (
    <>
      {/* Choose Joker Modal */}
      <Modal show={chooseJoker} onHide={() => setChooseJoker(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Choose the new Joker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                  delete={false}
                  id={player.id}
                  name={player.name}
                  callback={setJoker}
                />
              );
            })}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* Choose Lord Modal */}
      <Modal show={chooseLord} onHide={() => setChooseLord(false)}>
        <Modal.Header>
          <Modal.Title>Choose the new Joker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {//Loop through the available players
          props.players
            .filter(player => !lords.includes(player))
            .map(player => {
              return (
                <PlayerCard
                  delete={false}
                  id={player.id}
                  name={player.name}
                  callback={addLord}
                />
              );
            })}
        </Modal.Body>
      </Modal>
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
    players: state.players,
    rule: state.rule
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ruleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Gameboard);
