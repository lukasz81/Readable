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

  render() {
    const {categories} = this.state;
    return (
      <ul className="Nav">
        <li><Link to="/">ALL</Link></li>
        {categories.map( (category,index) => (
          <li key={index}>
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
