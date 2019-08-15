import React, { Component } from 'react';

export default class CommentInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            content: '',
        }
    }
    handleStateChange(e, type) {
        const newState = {};
        newState[type] = e.target.value;
        this.setState(newState);
    }

    onSubmit() {
        const {username, content} = this.state;
        if(!username) {
            alert('您还未输入用户名');
            return;
        } else if(!content) {
            alert('您还未输入内容');
            return;
        }
        this.props.onSubmit({username, content});
    }

    render() {
        return <div className="comment-input">
            <div className="comment-field">
                <span className="comment-field-name">
                    用户名：
                </span>
                <div className='comment-field-input'><input value={this.state.username} onChange={(e) => this.handleStateChange(e, 'username')} /></div>
            </div>
            <div className="comment-field">
                <span className='comment-field-name'>
                    评论内容：
                </span>
                <div className='comment-field-input'><textarea value={this.state.content} onChange={(e) => this.handleStateChange(e, 'content')} /></div>
            </div>
            <div className="comment-field-button">
                <button onClick={() => {this.onSubmit()}}>发布</button>    
            </div>
        </div>;
    }
}
