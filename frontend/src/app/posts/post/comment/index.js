import React, {Component} from 'react';
import Moment from 'react-moment';

class Comment extends Component {

    render() {
        const {comment,isDetailPage} = this.props;
        return (
            <div className="post-comment attached--left">
                <small>{comment.body}</small>
                <div className="post-info">
                    <small>{`Score: ${comment.voteScore} `}<span>•</span></small>
                    <small>{`Author: ${comment.author} `}<span>•</span></small>
                    <small>Created: <Moment fromNow>{comment.timestamp}</Moment></small>
                    {isDetailPage && (
                        <span>
                            <small>•</small>
                            <small onClick={() => this.props.edit('comments', comment)} className="actionable edit"> EDIT </small>
                            <small><span>•</span></small>
                            <small onClick={() => this.props.delete('comments', comment.id)} className="actionable delete"> DELETE</small>
                        </span>
                    )}
                </div>
            </div>
        )
    }
}

export {Comment}