import React from 'react';
import PlayerCard from './PlayerCard';
import styles from '../styling/playerlist.module.scss';

const PlayerList = props => {
  return (
    <ul className={styles.list}>
      <h3 style={{ color: 'white', textAlign: 'center' }}>Players:</h3>
      {props.players.map(player => (
        <li key={player.id}>
          <PlayerCard
            key={player.id}
            player={player}
            delete={true}
            callBack={props.callback}
          />
        </li>
      ))}
    </ul>
  );
};

export default PlayerList;
