import React from 'react';
import { Route, Link } from 'react-router-dom';
import Setup from './Setup';
import '../styling/home.css';

const Home = () => {
  return (
    <>
      <h1 className='titleHome'>MyLord</h1>
      <div>
        <Link to='/setup' className='btnPlay'>
          PLAY !
        </Link>
      </div>
      <Route path='/setup' component={Setup} />
    </>
  );
};

export default Home;
