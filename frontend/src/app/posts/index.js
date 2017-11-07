import React, {Component} from 'react';
import Post from './post/index';
import {connect} from "react-redux";
import {storePosts} from './actions';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            category: this.props.match.params.category
        }
    }

    componentWillReceiveProps(nextProps) {
        const category = nextProps.match.params.category;
        this.setState({
            category: category
        })
    }

    componentWillMount() {
        const url = `${process.env.REACT_APP_BACKEND}/posts`;
        fetch(url, {headers: {'Authorization': '*'}})
            .then(res => {
                return ( res.json() )
            })
            .then(posts => {
                this.props.storeFetchedPosts(this.compareFunction(posts,'score'))
            });
    }

    compareFunction(elements,sort) {
        return elements.sort((a,b) => {
            return sort === 'score' ? b.voteScore - a.voteScore : b.timestamp - a.timestamp
        })
    }

    render() {
        const {category} = this.state;
        const {sortBy} = this.props;
        const posts = this.props.posts ? this.compareFunction(this.props.posts,sortBy) : [];
        const currentPath = this.props.location.pathname;
        console.log(posts,sortBy);
        return (
            <div className="posts">
                {posts.filter(post => category === post.category || !category).map(post => (
                    <Post key={post.category} post={post} path={currentPath}/>
                ))}
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        posts: state.postsReducer.posts,
        sortBy: state.toggleSortReducer.sortBy
    };
}

function mapDispatchToProps (dispatch) {
    return {
        storeFetchedPosts: (data) => dispatch(storePosts(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Posts);
