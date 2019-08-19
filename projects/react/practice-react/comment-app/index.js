import React, { Component } from 'react';
import wrapWithLoadData from './wrapWithLoadData';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

class CommentApp extends Component{
    constructor(props) {
        super(props);
    }

    handleSubmit(comment) {
        const comments = this.props.data;
        comments.push(comment);
        this.props.saveData(comments);
    }

    handleDelete(index) {
        const comments = this.props.data;
        comments.splice(index, 1);
        this.props.saveData(comments);
    }

    render() {
        return <div>
            <CommentInput onSubmit={this.handleSubmit.bind(this)} />
            <CommentList comments={this.props.data} handleDelete={() => this.handleDelete()}/>
        </div>
    }
}

CommentApp = wrapWithLoadData(CommentApp, 'comments');
export default CommentApp;

