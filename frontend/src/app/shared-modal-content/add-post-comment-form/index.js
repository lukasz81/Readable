import React, {Component} from 'react';

class AddPostCommentForm extends Component {

    render() {
        const {
            handleSubmit,
            handleInputChange,
            body,
            author
        } = this.props;
        return (
            <div>
                <h3 className='color--green margin--bottom'>Add a new comment</h3>
                <form onSubmit={handleSubmit} className='add-post'>
                    <label>
                        <small>Your comment:</small>
                        <br/>
                        <input
                            name="body"
                            type="text"
                            placeholder="Add text"
                            value={body}
                            onChange={handleInputChange}/>
                    </label>
                    <br/>
                    <div>
                        <label>
                            <small>Author:</small>
                            <br/>
                            <input
                                name="author"
                                type="text"
                                placeholder="Your name"
                                value={author}
                                onChange={handleInputChange}/>
                        </label>
                        <br/>
                    </div>
                    <br/>
                    <button>Add comment</button>
                </form>
            </div>
        );
    }
}

export {AddPostCommentForm};