import React, { useState } from 'react';
import PlayerCard from './PlayerCard';

import styles from '../styling/modal.module.scss';

const Modal = props => {
  const [open, setOpen] = useState(props.open);
  const instructions =
    props.role === 'joker'
      ? 'You get to choose a new joker. They will take the place of the current one if there is already one.'
      : 'You get to choose a new Lord. The chosen player has to drink 6 times to become Lord.';

  // const closeModal = () => {
  //   setOpen(false);
  // };

  console.log(`I'm the ${props.role} modal, and I am ${open}`);
  return (
    <div className={`${styles.modal} ${open ? styles.open : styles.close}`}>
      <div className={styles.modalFrame}>
        <h1 className={styles.title}>{`Choose a new ${
          props.role === 'joker' ? 'Joker' : 'Lord'
        }`}</h1>
        {/* <p className={styles.closeBtn} onClick={closeModal}>
          X
        </p> */}

        <p className={styles.instructions}>{instructions}</p>

        {props.players.map(player => {
          return (
            <PlayerCard
              key={player.id}
              player={player}
              delete={false}
              callBack={player => props.callback(player)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Modal;
