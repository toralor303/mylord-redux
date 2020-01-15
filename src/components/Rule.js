import React, { useState } from 'react';

const Rule = props => {
  const [joker, setJoker] = useState(null);
  const [lords, setLords] = useState([]);

  const getRule = () => {
    const f = props.dice[0];
    const s = props.dice[1];

    //Two same numbers
    if (f === s) {
      //Two sixes...
      if (f === 6) {
        //If adding a new Lord doesn't mean all players will be Lords
        if (lords.length + 1 < props.playerCount) {
          setLords([...lords, props.currentPlayer]);
          return 'Pick a player to drink 6 times (you can pick yourself). When the player is done drinking, he or she becomes Lord. Any disrespect towards them gives them the right to make you drink once. They will now be called my Lord by everyone. They also get to invent a new rule and are responsible for making sure everyone respects it.';
        }
        //If only one player is not Lord, all Lords loose their status
        else {
          setLords([]);
          return 'All lords loose their status and become regular players again. The rules set by the lords still apply.';
        }
      } else
        return f === 1 //Ternary to handle the plural
          ? 'Pick a player to drink 1 time.'
          : 'Pick a player to drink ' + f + ' times.';
    }
    //If only one of the two numbers is 3, and there's no joker already
    if (f !== s && (f === 3 || s === 3) && joker === null) {
      setJoker(props.currentPlayer);
      return 'You are now the joker. You drink everytime someone rolls a 3. If they roll two, you drink twice. To free yourself from this curse you have to roll another single 3.';
    }
    if (f + s === 7) return 'Cheers ! Everyone drinks !';
    if (f + s === 5) return 'The last person to say MyLord drinks';
    if (f + s === 3) {
      setJoker({ id: 0, name: 'Joker chosen by the player' });
      return 'You get to choose a new joker. They will take the place of the current one if there is already one.';
    }

    return 'Better luck next time.';
  };

  return <p style={{ height: '75px' }}>{getRule()}</p>;
};

export default Rule;
