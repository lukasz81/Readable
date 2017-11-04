import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../navigation';
import Posts from '../posts';

class App extends Component {
	render () {
		return (
            <BrowserRouter>
                <div className='wrapper'>
                    <Route render={ props => (
                        <Navigation {...props}/>
                    )}/>
                    <Switch>
                        <Route exact path="/" component={Posts}/>
                        <Route path="/:category" render={ props => (
                            <Posts {...props}/>
                        )}/>
                    </Switch>
                </div>
            </BrowserRouter>
		);
	}
}

export default App;
