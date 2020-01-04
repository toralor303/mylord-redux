import React from 'react';
import PlayerList from '../components/PlayerList';
import PlayerForm from '../components/PlayerForm';
import { Link } from 'react-router-dom';

const Setup = () => {
  return (
    <div>
      <img src='images/LogoMyLord.svg' id='titleSetup' alt='MyLord logo' />
      <PlayerForm />
      <PlayerList />
      <div className='btnPlaySetup'>
        <Link to='/game'>PLAY !</Link>
      </div>
    </div>
  );
};

export default Setup;
