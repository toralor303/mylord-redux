import React from 'react';
import PlayerList from '../components/PlayerList';
import PlayerForm from '../components/PlayerForm';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as playerActions from '../redux/actions/playerActions';
import PropTypes from 'prop-types';

const Setup = props => {
  const addPlayer = playerName => {
    props.dispatch(playerActions.createPlayer(playerName));
  };

  return (
    <div>
      <img src='images/LogoMyLord.svg' id='titleSetup' alt='MyLord logo' />
      <PlayerForm />
      <PlayerList players={[]} addPlayer={addPlayer} />
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
