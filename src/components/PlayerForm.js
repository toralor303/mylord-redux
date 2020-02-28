import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as playerActions from '../redux/actions/playerActions';
import { bindActionCreators } from 'redux';
import styles from '../styling/playerform.module.scss';

const PlayerForm = props => {
  const [playerName, setPlayerName] = useState('');

  const addPlayer = name => {
    const newPlayer = {
      id: props.players.length === 0 ? 1 : props.players[props.players.length - 1].id + 1,
      name: name
    };
    props.actions.createPlayer(newPlayer);
    setPlayerName('');
  };

  return (
    <form className={styles.form}>
      <input
        className={styles.input}
        type='text'
        onChange={e => {
          e.preventDefault();
          setPlayerName(e.target.value);
        }}
        value={playerName}></input>
      <button
        className={styles.btn}
        type='submit'
        onClick={e => {
          e.preventDefault();
          addPlayer(playerName);
        }}>
        Add
      </button>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    players: state.players
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(playerActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerForm);
