import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import Navigation from './navigation';
import Posts from './posts';
import Modal from 'react-modal';
import CancelIcon from 'react-icons/lib/md/cancel'
import './index.css';
import {showModal,closeModal} from "./navigation/actions";
import {connect} from "react-redux";

class App extends Component {

    onHideModal() {
        this.props.hide({modalOpen: false})
    }
    onShowModal() {
        this.props.show({modalOpen: true})
    }

    render() {
        const {store} = this.props;
        return (
            <BrowserRouter>
                <div className='wrapper'>
                    <Route render={props => (
                        <Navigation showModal={() => this.onShowModal()} store={store} {...props}/>
                    )}/>
                    <Switch>
                        <Route exact path="/" component={Posts}/>
                        <Route path="/:category" render={props => (
                            <Posts {...props}/>
                        )}/>
                    </Switch>
                    <Modal
                        className='modal'
                        overlayClassName='overlay'
                        isOpen={this.props.state.modalOpen}
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

function mapStateToProps (state) {
    return {state};
}

function mapDispatchToProps (dispatch) {
    return {
        show: (data) => dispatch(showModal(data)),
        hide: (data) => dispatch(closeModal(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
