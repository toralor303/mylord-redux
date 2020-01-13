import React from 'react';
import { connect } from 'react-redux';
import * as playerActions from '../redux/actions/playerActions';
import { bindActionCreators } from 'redux';

const PlayerCard = props => {
  return (
    <>
      <span>{props.name}</span>
      <img
        alt={'Delete'}
        className='deletePlayer'
        src='images/deletePlayer.svg'
        style={{ width: '15px' }}
        onClick={() => {
          console.log(props);
          props.actions.deletePlayer(props.id);
        }}
      />
    </>
  );
};

function mapStateToProps(state) {
  return {
    player: state.players
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(playerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCard);
