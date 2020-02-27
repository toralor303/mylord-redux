import React from 'react';
import PlayerList from '../components/PlayerList';
import PlayerForm from '../components/PlayerForm';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import colorCodes from '../styling/variables.scss';

const Setup = props => {
  const storePlayers = () => {
    localStorage.setItem('players', JSON.stringify(props.players));
  };
  return (
    <div style={{backgroundColor: colorCodes.primaryColor, height: '100vh'}}>
      <img src='images/LogoMyLord.svg' className='titleSetup' alt='MyLord logo' />
      <PlayerForm />
      <PlayerList players={props.players} />
      <div className='btnPlay'>
        <Link to='/game' onClick={storePlayers} className='btnPlay'>
          PLAY !
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    players: state.players
  };
};

export default connect(mapStateToProps)(Setup);
