import React from 'react';

const PlayerForm = () => {
  return (
    <form className='form'>
      <input type='text' onChange={console.log(e => e.target.value)}></input>
      <button type='submit' onClick={console.log('Add player test')}>
        Add
      </button>
    </form>
  );
};

export default PlayerForm;
