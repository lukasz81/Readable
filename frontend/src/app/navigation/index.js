import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AddIcon from 'react-icons/lib/md/add-circle-outline'
import {connect} from "react-redux";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

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
        this.props.showModal();
    }

    render() {
        const {categories} = this.state;
        const currentPath = this.props.location.pathname;
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
                <li title="Add post" onClick={() => this.onShowModal()} className='add-new active'><AddIcon size={35}/></li>
            </ul>
        );
    }
}

export default Navigation
