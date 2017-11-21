import React, {Component} from 'react';

class AddOrEditCommentForm extends Component {

    render() {
        const {
            handleSubmit,
            handleInputChange,
            body,
            author,
            action
        } = this.props;
        const labels = {
            header: action === 'edit-comment' ? 'Edit comment' : 'Add a new comment',
            button: action === 'edit-comment' ? 'Save changes' : 'Add comment'
        };
        return (
            <div>
                <h3 className='color--green margin--bottom'>{labels.header}</h3>
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
                    {action !== 'edit-comment' && (
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
                    )}
                    <br/>
                    <button>{labels.button}</button>
                </form>
            </div>
        );
    }
}

export {AddOrEditCommentForm};