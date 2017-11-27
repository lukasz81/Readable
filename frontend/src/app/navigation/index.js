import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import AddIcon from 'react-icons/lib/md/add-circle-outline';
import SortIcon from 'react-icons/lib/md/sort';
import {connect} from 'react-redux';
import {toggleSort} from "../posts/actions";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    static ICON_SIZE = 35;

    componentDidMount() {
        const url = `${process.env.REACT_APP_BACKEND}/categories`;
        fetch(url, {headers: {'Authorization': '*'}})
            .then(res => {
                return ( res.json() )
            })
            .then(data => {
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
        const {categories} = this.state;
        const currentPath = this.props.location.pathname;
        return (
            <ul className="nav">
                <Link to="/"><li className={Navigation.chooseClassNameForLink(currentPath, '')}>ALL</li></Link>
                {categories.map((category, index) => (
                    <Link key={index} to={`/${category.path}`}>
                        <li className={Navigation.chooseClassNameForLink(currentPath, category.path)}>
                            {category.name.toUpperCase()}
                        </li>
                    </Link>
                ))}
                <li title="Add post" onClick={() => this.onShowModal()} className='add-new nav-icon active'><AddIcon size={Navigation.ICON_SIZE}/></li>
                <li title={`Currently sorted by ${this.props.sort}`} className='nav-icon active'>
                    <SortIcon className={this.props.sort}
                              onClick={() => this.onToggleSort()}
                              size={Navigation.ICON_SIZE}/>
                </li>
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
        sort: state.postsReducer.sortBy ? state.postsReducer.sortBy : 'score'
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);
