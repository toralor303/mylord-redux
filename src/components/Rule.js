import React from 'react';

const Rule = props => {
  const getRule = () => {
    const f = props.dice[0];
    const s = props.dice[1];

    if (f === s) {
      if (f === 6)
        return 'Pick a player to drink 6 times (you can pick yourself). When the player is done drinking, he or she becomes Lord. Any disrespect towards them gives them the right to make you drink once. They will now be called my Lord by everyone. They also get to invent a new rule and are responsible for making sure everyone respects it.';
      else
        return f === 1
          ? 'Pick a player to drink 1 time.'
          : 'Pick a player to drink ' + f + ' times.';
    }
    if (f !== s && (f === 3 || s === 3))
      return 'You are now the joker. You drink everytime someone rolls a 3. If they roll two, you drink twice. To free yourself from this curse you have to roll another single 3.';
    if (f + s === 7) return 'Cheers ! Everyone drinks !';
    if (f + s === 5) return 'The last person to say MyLord drinks';
    if (f + s === 3)
      return 'You get to choose a new joker. They will take the place of the current one if there is already one.';

    return 'Better luck next time.';
  };

  return <p style={{ height: '75px' }}>{getRule()}</p>;
};

export default Rule;
