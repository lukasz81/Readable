import React, {Component} from 'react';

class AddOrEditPostForm extends Component {

    render() {
        const {
            isInEditMode,
            handleSubmit,
            handleInputChange,
            title,
            body,
            author,
            category } = this.props;
        const labels = {
            header: isInEditMode ? 'Edit post' : 'Add a new post',
            button: isInEditMode ? 'Save changes' : 'Submit'
        };
        return (
            <div>
            <h3 className='color--green margin--bottom'>{labels.header}</h3>
            <form onSubmit={handleSubmit} className='add-post'>
                <label>
                    <small>Title:</small>
                    <br/>
                    <input
                        name="title"
                        type="text"
                        value={title}
                        placeholder="Add title"
                        onChange={handleInputChange}/>
                </label>
                <br/>
                <label>
                    <small>Your text:</small>
                    <br/>
                    <input
                        name="body"
                        type="text"
                        placeholder="Add text"
                        value={body}
                        onChange={handleInputChange}/>
                </label>
                <br/>
                {!isInEditMode && (
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
                        <label>
                            <small>Category:</small>
                        </label>
                        <select name="category"
                                value={category}
                                onChange={handleInputChange}>
                            <option value="react">react</option>
                            <option value="redux">redux</option>
                            <option value="udacity">udacity</option>
                        </select>
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

export {AddOrEditPostForm};