import React, {useState} from 'react';

const PlayerForm = props => {
  const [playerName, setPlayerName] = useState('');

  return (
    <form className='form'>
      <input
        type='text'
        onChange={e => {
          setPlayerName(e.target.value);
        }}></input>
      <button type='submit' onClick={props.addPlayer(playerName)}>
        Add
      </button>
    </form>
  );
};

export default PlayerForm;
