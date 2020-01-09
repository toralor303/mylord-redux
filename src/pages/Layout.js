import React from 'react';
import {Route} from 'react-router-dom';

import Home from './Home';
import Setup from './Setup';
import Game from './Game';

function RoutingLayout() {
  return (
    <div>
      <div className='container'>
        <Route exact path='/' component={Home} />
        <Route path='/home' component={Home} />
        <Route path='/setup' component={Setup} />
        <Route path='/game' component={Game} />
      </div>
    </div>
  );
}

export default RoutingLayout;
