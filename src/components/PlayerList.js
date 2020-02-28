import React from 'react';
import PlayerCard from './PlayerCard';
import styles from '../styling/playerlist.module.scss';

const PlayerList = props => {
  return (
    <ul className={styles.list}>
      {props.players.map(player => (
        <li key={player.id}>
          <PlayerCard delete={true} id={player.id} name={player.name} />
        </li>
      ))}
    </ul>
  );
};

export default PlayerList;
