import React from 'react';
import PlayerCard from './PlayerCard';

const PlayerList = props => {
  return (
    <ul id='list'>
      {props.players.map(player => (
        <li key={player.id}>
          <PlayerCard delete={true} id={player.id} name={player.name} />
        </li>
      ))}
    </ul>
  );
};

export default PlayerList;
