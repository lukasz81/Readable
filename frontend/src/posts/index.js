import React, { Component } from 'react';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      category: 'all'
    }
  }
  componentWillReceiveProps(nextProps) {
    const category = nextProps.match.params.category;
    this.setState({
      category: category === undefined ? 'all' : category.toString()
    })
  }
  componentDidMount() {
    const url = `${process.env.REACT_APP_BACKEND}/posts`;
    fetch( url, { headers: { 'Authorization': '*' } } )
      .then( res => { return( res.json() ) })
      .then( posts => {
        this.setState({posts: posts})
      });
  }
	render() {
    const {posts,category} = this.state;
		return (
      <div className="posts">
        {posts.filter( post => category === post.category || category === 'all' ).map( post => (
          <div className="post" key={post.category}>
            <p>{post.title}</p>
            <small>{post.body}</small>
          </div>
        ))}
      </div>
		);
	}
}
export default Posts;
