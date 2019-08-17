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

    componentDidMount() {
        const comments = localStorage.getItem('comments');
        if(comments) {
            this.setState({
                comments: JSON.parse(comments),
            })
        }
    }

    handleSubmit(comment) {
        const comments = this.state.comments;
        comments.push(comment);
        this._saveComments(comments);
    }

    handleDelete(index) {
        const comments = this.state.comments;
        comments.splice(index, 1);
        this._saveComments(comments);
    }

    _saveComments (comments) {
        this.setState({
            comments: comments,
        })
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    render() {
        return <div>
            <CommentInput onSubmit={this.handleSubmit.bind(this)} />
            <CommentList comments={this.state.comments} handleDelete={() => this.handleDelete()}/>
        </div>
    }
}