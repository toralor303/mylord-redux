import React from 'react';
import PlayerCard from './PlayerCard';

const Modal = props => {
  /*
        props: players, role, callback
    */
  const instructions =
    props.role === 'joker'
      ? 'You get to choose a new joker. They will take the place of the current one if there is already one.'
      : 'You get to choose a new Lord. The chosen player has to drink 6 times to become Lord.';

  return (
    <div className='modal'>
      <div className='modal-frame'>
        <h1 className='title'>
          {'Choose a new ' + props.role === 'joker' ? 'Joker' : 'Lord'}
        </h1>
        <p className='closeBtn'>X</p>

        <p>{instructions}</p>

        {props.players.map(player => {
          return (
            <PlayerCard
              key={player.id}
              id={player.id}
              name={player.name}
              delete={false}
              callback={props.callback}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Modal;
