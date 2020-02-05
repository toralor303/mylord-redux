import React from 'react';
import PlayerList from '../components/PlayerList';
import PlayerForm from '../components/PlayerForm';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

const Setup = props => {
  const storePlayers = () => {
    localStorage.setItem('players', props.players[0].name);
  };
  return (
    <div>
      <img src='images/LogoMyLord.svg' id='titleSetup' alt='MyLord logo' />
      <PlayerForm />
      <PlayerList players={props.players} />
      <div className='btnPlaySetup'>
        <Link to='/game' onClick={storePlayers}>
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
