import React, {Component} from 'react';
import Moment from 'react-moment';

class ActionsPanel extends Component {

    render() {
        const {element, type} = this.props;
        return (
            <div className="post-info">
                <small className="color--silver-light">{`Score: ${element.voteScore} `}<span>•</span></small>
                <small className="color--silver-light">{`Author: ${element.author} `}<span>•</span></small>
                {element.commentCount !== undefined && (
                    <small className="color--silver-light">{`Comments: ${element.commentCount} `}<span>•</span></small>
                )}
                <small className="color--silver-light">Created: <Moment fromNow>{element.timestamp}</Moment></small>
                <span>
                    <br/>
                    <small onClick={() => this.props.edit(type, element)} className="actionable edit color--green"> EDIT </small>
                    <small><span>•</span></small>
                    <small onClick={() => this.props.delete(type, element.id)} className="actionable delete color--red"> DELETE</small>
                    <small><span>•</span></small>
                    <small onClick={() => this.props.onvote(type, element.id, 'upVote')} className="actionable delete color--green"> UPVOTE</small>
                    <small><span>•</span></small>
                    <small onClick={() => this.props.onvote(type, element.id, 'downVote')} className="actionable delete color--red"> DOWNVOTE</small>
                </span>
            </div>

        )
    }
}

export {ActionsPanel}