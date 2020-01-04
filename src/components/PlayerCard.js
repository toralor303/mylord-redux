import React from 'react';

const PlayerCard = ({ id, name }) => {
  return (
    <>
      <span>{name}</span>
      <img
        alt={id}
        className='deletePlayer'
        src='images/deletePlayer.svg'
        onClick={() => {
          console.log('Test delete');
        }}
      />
    </>
  );
};

export default PlayerCard;
