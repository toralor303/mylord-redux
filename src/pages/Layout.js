import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import Setup from './Setup';
import Game from './Game';

function RoutingLayout() {
  return (
    <div>
      {/* <header>
                <nav>
                    <ul>
                        <li><Link to='/home'>Home page</Link></li>
                        <li><Link to='/'>And</Link></li>
                        <li><Link to='/'>Other</Link></li>
                        <li><Link to='/'>Links</Link></li>
                    </ul>
                </nav>
            </header> */}

      <div className='container'>
        <Route exact path='/' component={Home} />
        <Route path='/home' component={Home} />
        <Route path='/setup' component={Setup} />
        <Route path='/game' component={Game} />
        {/*<Route path='/home' component={Home} />
                <Route path='/home' component={Home} /> */}
      </div>
    </div>
  );
}

export default RoutingLayout;
