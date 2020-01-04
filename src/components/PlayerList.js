import React from 'react';
import PlayerCard from './PlayerCard';

const PlayerList = () => {
  const players = [
    { id: 1, name: 'Charles' },
    { id: 2, name: 'Myriam' }
  ];

  return (
    <ul id='list'>
      {players.map(player => (
        <li key={player.id}>
          <PlayerCard key={player.id} id={player.id} name={player.name} />
        </li>
      ))}
    </ul>
  );
};

export default PlayerList;
