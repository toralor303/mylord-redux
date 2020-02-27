import React, { useState } from 'react';
import PlayerCard from './PlayerCard';

import styles from '../styling/modal.module.scss';

const Modal = props => {
  const [open, setOpen] = useState(props.open);
  const instructions =
    props.role === 'joker'
      ? 'You get to choose a new joker. They will take the place of the current one if there is already one.'
      : 'You get to choose a new Lord. The chosen player has to drink 6 times to become Lord.';

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className={`${styles.modal} ${open ? styles.open : styles.close}`}>
      <div className={styles.modalFrame}>
        <h1 className='title'>
          {'Choose a new ' + props.role === 'joker' ? 'Joker' : 'Lord'}
        </h1>
        <p className={styles.closeBtn} onClick={closeModal}>
          X
        </p>

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
