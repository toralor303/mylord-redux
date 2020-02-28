import React from 'react';
import PlayerList from '../components/PlayerList';
import PlayerForm from '../components/PlayerForm';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from '../styling/setup.module.scss';

const Setup = props => {
  const storePlayers = () => {
    localStorage.setItem('players', JSON.stringify(props.players));
  };

  return (
    <div className={styles.container}>
      <img src='images/LogoMyLord.svg' className={styles.title} alt='MyLord logo' />
      <PlayerForm />
      <PlayerList players={props.players} />
      <Link to='/game' onClick={storePlayers} className={styles.btn}>
        PLAY !
      </Link>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    players: state.players
  };
};

export default connect(mapStateToProps)(Setup);
