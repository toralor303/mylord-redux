import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as playerActions from '../redux/actions/playerActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styles from '../styling/playercard.module.scss';

const PlayerCard = props => {
  const [isDeleted, setIsDeleted] = useState(false);

  return (
    <div
      className={styles.card}
      onClick={() => {
        if (!props.delete) props.callBack(props.player);
      }}>
      <span className={styles.name}>{props.player.name}</span>
      {props.delete ? (
        <img
          alt={'Delete'}
          className={isDeleted ? [styles.btn, styles.deletedCard] : styles.btn}
          src='images/deletePlayer.svg'
          onClick={() => {
            setIsDeleted(true);
            props.actions.deletePlayer(props.player.id);
          }}
        />
      ) : (
        <span />
      )}
    </div>
  );
};

PlayerCard.propTypes = {
  player: PropTypes.object.isRequired
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
