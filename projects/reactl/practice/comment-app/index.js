import React, { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

export default class CommentApp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        }
    }

    handleSubmit(comment) {
        const comments = this.state.comments;
        comments.push(comment);
        this.setState({
            comments: comments,
        })
    }

    render() {
        return <div>
            <CommentInput onSubmit={this.handleSubmit.bind(this)} />
            <CommentList comments={this.state.comments} />
        </div>
    }
}