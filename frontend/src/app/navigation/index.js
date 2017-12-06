import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AddIcon from 'react-icons/lib/md/add-circle-outline';
import {connect} from 'react-redux';
import {toggleSort} from "../posts/actions";
import * as API from "../api/index";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import './index.css';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        API.fetchElements('/categories').then(data => {
            this.setState({categories: data.categories});
        });
    }

    static chooseClassNameForLink(currentPath, path) {
        return currentPath === `/${path}` ? 'active' : 'inactive'
    }

    onShowModal() {
        this.props.emitOnShowModal();
    }

    onToggleSort() {
        this.props.toggleSort()
    }

    render() {
        const {isPostDetailPage,sort} = this.props;
        const {categories} = this.state;
        const currentPath = this.props.location.pathname;
        return (
            <ul className="nav">
                <Link to="/">
                    <li className={Navigation.chooseClassNameForLink(currentPath, '')}>ALL</li>
                </Link>
                {categories.map((category, index) => (
                    <Link key={index} to={`/${category.path}`}>
                        <li className={Navigation.chooseClassNameForLink(currentPath, category.path)}>
                            {category.name.toUpperCase()}
                        </li>
                    </Link>
                ))}
                <li title="Add post" onClick={() => this.onShowModal()} className='add-new nav-icon active'>
                    <AddIcon size={35}/>
                </li>
                {isPostDetailPage === false && (
                    <li className='nav-icon active material-holder'>
                        <DropDownMenu value={sort === 'score' ? 1 : 2}
                                      onChange={() => this.onToggleSort()}>
                            <MenuItem value={1}
                                      primaryText={`Sort by score`}/>
                            <MenuItem value={2}
                                      primaryText={`Sort by time`}/>
                        </DropDownMenu>
                    </li>
                )}

            </ul>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return {
        toggleSort: () => dispatch(toggleSort())
    }
}

function mapStateToProps (state) {
    return {
        state,
        sort: state.postsReducer.sortBy ? state.postsReducer.sortBy : 'score',
        isPostDetailPage: state.postReducer.isPostDetailPage
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);
