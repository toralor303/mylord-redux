import React from 'react';
import { Route, Link } from 'react-router-dom';
import Setup from './Setup';
import styles from '../styling/home.module.scss';

const Home = () => {
  return (
    <>
      <h1 className={styles.titleHome}>MyLord</h1>
      <div>
        <Link to='/setup' className={styles.btnPlay}>
          PLAY !
        </Link>
      </div>
      <Route path='/setup' component={Setup} />
    </>
  );
};

export default Home;
