import React from 'react';

const Dice = props => {
  return <img alt={props.value} src={'images/' + props.value + '.svg'} className='dice' />;
};

export default Dice;
