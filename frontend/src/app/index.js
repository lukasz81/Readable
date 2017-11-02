import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../navigation';
import Posts from '../posts';

class App extends Component {
	render() {
		return (
      <BrowserRouter>
        <div className='wrapper'>
          <Navigation/>
          <Switch>
            <Route exact path="/" component={Posts}/>
            <Route path="/:category" component={Posts}/>
          </Switch>
        </div>
      </BrowserRouter>
		);
	}
}

export default App;
