import React, { Component } from 'react';
import Comment from './Comment';

export default class CommentList extends Component {
    render() {
        const { comments } = this.props;
        return <div>
            {
                // 顺序不会改变，所以用index作为key不会降低性能
                comments.map((comment, index) => {
                    return <Comment key={comment.createdTime} index={index} comment={comment} handleDelete={this.props.handleDelete} />
                })
            }
        </div>;
    }
}

CommentList.defaultProps = {
    comments: [],
}
