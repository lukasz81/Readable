import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import {Router} from 'react-router-dom';
import Navigation from './navigation';
import Posts from './posts';
import Post from './posts/post';
import Modal from 'react-modal';
import CancelIcon from 'react-icons/lib/md/cancel'
import {toggleModal} from "./shared-modal-content/actions";
import {connect} from "react-redux";
import ModalContent from "./shared-modal-content/index";
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

class App extends Component {

    onHideModal() {
        this.props.toggleModal({})
    }
    onShowModal() {
        this.props.toggleModal({})
    }

    render() {
        const {store,modalOpen} = this.props;
        return (
            <Router history={history}>
                <div className='wrapper'>
                    <Route render={props => (
                        <Navigation emitOnShowModal={() => this.onShowModal()}
                                    store={store}
                                    {...props}/>
                    )}/>
                    <Switch>
                        <Route exact path="/" component={Posts}/>
                        <Route path="/:category/:id" component={Post}/>
                        <Route path="/:category" render={props => (
                            <Posts {...props}/>
                        )}/>
                    </Switch>
                    <Modal
                        className='modal'
                        overlayClassName='overlay'
                        isOpen={modalOpen}
                        contentLabel='Modal'>
                        <CancelIcon onClick={() => this.onHideModal()}
                                    className="close-icon"/>
                        <ModalContent/>
                    </Modal>
                </div>
            </Router>
        );
    }
}

function mapStateToProps (state) {
    return {
        state,
        modalOpen: state.modalReducer.modalOpen
    };
}

export default connect(mapStateToProps,{toggleModal})(App);
