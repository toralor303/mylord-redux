import React, { useState } from 'react';
import PlayerList from '../components/PlayerList';
import PlayerForm from '../components/PlayerForm';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as playerActions from '../redux/actions/playerActions';
import PropTypes from 'prop-types';

const Setup = props => {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Charles' },
    { id: 2, name: 'Steven' }
  ]);

  props.dispatch(playerActions.createPlayer(players));

  return (
    <div>
      <img src='images/LogoMyLord.svg' id='titleSetup' alt='MyLord logo' />
      <PlayerForm />
      <PlayerList players={players} />
      <div className='btnPlaySetup'>
        <Link to='/game'>PLAY !</Link>
      </div>
    </div>
  );
};

Setup.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    players: state.players
  };
};

export default connect(mapStateToProps)(Setup);
