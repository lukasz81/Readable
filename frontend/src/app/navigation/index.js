import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import AddIcon from 'react-icons/lib/md/add-circle-outline';
import SortIcon from 'react-icons/lib/md/sort';
import {connect} from 'react-redux';
import {toggleSort} from '../navigation/actions';

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
        this.props.sortBy({sortBy: ''})
    }

    render() {
        const {categories} = this.state;
        const currentPath = this.props.location.pathname;
        console.log('propsy ',this.props.sort);
        return (
            <ul className="Nav">
                <li className={Navigation.chooseClassNameForLink(currentPath, '')}><Link to="/">ALL</Link></li>
                {categories.map((category, index) => (
                    <li className={Navigation.chooseClassNameForLink(currentPath, category.path)} key={index}>
                        <Link to={category.path}>
                            {category.name.toUpperCase()}
                        </Link>
                    </li>
                ))}
                <li title="Add post" onClick={() => this.onShowModal()} className='add-new nav-icon active'><AddIcon size={Navigation.ICON_SIZE}/></li>
                <li title={`Sort by ${this.props.sort}`} className='nav-icon active'>
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
        sortBy: (data) => dispatch(toggleSort(data))
    }
}

function mapStateToProps (state) {
    return {
        state,
        sort: state.toggleSortReducer.sortBy
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Navigation);
