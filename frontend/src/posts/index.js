import React, {Component} from 'react';
import Post from './post'

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

    componentDidMount() {
        const url = `${process.env.REACT_APP_BACKEND}/posts`;
        fetch(url, {headers: {'Authorization': '*'}})
            .then(res => {
                return ( res.json() )
            })
            .then(posts => {
                this.setState({posts: posts.sort((a,b) => {
                    return b.voteScore - a.voteScore
                })})
            });
    }

    render() {
        const {posts, category} = this.state;
        const currentPath = this.props.location.pathname;
        return (
            <div className="posts">
                {posts.filter(post => category === post.category || !category).map(post => (
                    <Post key={post.category} post={post} path={currentPath}/>
                ))}
            </div>
        );
    }
}

export default Posts;
