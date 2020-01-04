import React from 'react';
import { Route, Link } from 'react-router-dom';
import Setup from './Setup';

const Home = () => {
  return (
    <>
      <h1 id='titleHome'>MyLord</h1>
      <div className='btnPlay'>
        <Link to='/setup'>PLAY !</Link>
      </div>
      <Route path='/setup' component={Setup} />
    </>
  );
};

export default Home;
