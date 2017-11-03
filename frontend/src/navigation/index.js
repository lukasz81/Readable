import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_BACKEND}/categories`;
    fetch( url, { headers: { 'Authorization': '*' } } )
      .then( res => {
        return( res.json() )
      })
      .then( data => {
        this.setState({categories: data.categories});
      });
  }

  chooseClassNameForLink(currentPath,path) {
    return currentPath === `/` + path ? 'active':'inactive'
  }

  render() {
    const {categories} = this.state;
    const currentPath = this.props.location.pathname;
    return (
      <ul className="Nav">
        <li className={this.chooseClassNameForLink(currentPath,'')}><Link to="/">ALL</Link></li>
        {categories.map( (category,index) => (
          <li className={this.chooseClassNameForLink(currentPath,category.path)} key={index}>
            <Link to={category.path}>
              {category.name.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default Navigation
