import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../navigation';
import Posts from '../posts';
import Modal from 'react-modal';
import CancelIcon from 'react-icons/lib/md/cancel'
import './index.css';
import {closeModal} from "../navigation/actions";

class App extends Component {
    state = {
        modalOpen: false
    };

    componentDidMount () {
        const { store } = this.props;
        store.subscribe(() => {
            const subject = store.getState();
            this.setState({
                modalOpen: subject.modalOpen
            })
        })
    }

    onHideModal() {
        this.props.store.dispatch(closeModal({
            modalOpen: false
        }))
    }

	render () {
        const { store } = this.props;
		return (
            <BrowserRouter>
                <div className='wrapper'>
                    <Route render={ props => (
                        <Navigation store={ store } {...props}/>
                    )}/>
                    <Switch>
                        <Route exact path="/" component={Posts}/>
                        <Route path="/:category" render={ props => (
                            <Posts {...props}/>
                        )}/>
                    </Switch>
                    <Modal
                        className='modal'
                        overlayClassName='overlay'
                        isOpen={this.state.modalOpen}
                        onRequestClose={this.closeModal}
                        contentLabel='Modal'
                    >
                        <div>Add a new post</div>
                        <CancelIcon onClick={() => this.onHideModal()} className="close-icon"/>
                    </Modal>
                </div>
            </BrowserRouter>
		);
	}
}

export default App;
