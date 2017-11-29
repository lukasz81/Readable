import React, {Component} from 'react';
import Post from './post/index';
import {connect} from "react-redux";
import {storePosts} from './actions';
import {isOnDetailPage} from "./post/actions";

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
        this.props.isOnDetailPage(false);
        const url = `${process.env.REACT_APP_BACKEND}/posts`;
        fetch(url, {headers: {'Authorization': '*'}})
            .then(res => {
                return ( res.json() )
            }).then(posts => {
            this.props.storePosts(posts,'score');
            });
    }

    render() {
        const {category} = this.state;
        const posts = this.props.posts || [];
        const currentPath = this.props.location.pathname;
        return (
            <div className="posts">
                {posts.filter(post => category === post.category || !category).map(post => (
                    <Post key={post.id} post={post} path={currentPath}/>
                ))}
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        post: state.postReducer.post,
        posts: state.postsReducer.posts,
        sortBy: state.postsReducer.sortBy
    };
}

function mapDispatchToProps (dispatch) {
    return {
        storePosts: (data,sortBy) => dispatch(storePosts(data,sortBy)),
        isOnDetailPage: (boolean) => dispatch(isOnDetailPage(boolean))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Posts);
