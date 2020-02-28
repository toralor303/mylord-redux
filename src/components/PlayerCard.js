import React from 'react';
import { connect } from 'react-redux';
import * as playerActions from '../redux/actions/playerActions';
import { bindActionCreators } from 'redux';
import styles from '../styling/playercard.module.scss';

const PlayerCard = props => {
  return (
    <div className={styles.card}>
      <span className={styles.name}>{props.name}</span>
      {props.delete ? (
        <img
          alt={'Delete'}
          className={styles.btn}
          src='images/deletePlayer.svg'
          style={{ width: '15px' }}
          onClick={() => {
            console.log(props);
            props.actions.deletePlayer(props.id);
          }}
        />
      ) : (
        <span />
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    players: state.players
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(playerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCard);
