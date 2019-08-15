import React, { Component } from 'react';

export default class CommentList extends Component {
    render() {
        const { comments } = this.props;
        return <div>
            {
                // 顺序不会改变，所以用index作为key不会降低性能
                comments.map((comment, index) => {
                    return <div key={index} className='comment'>
                       <span className='comment-user'>{comment.username}</span> :
                       {comment.content}
                    </div>
                })
            }
        </div>;
    }
}

CommentList.defaultProps = {
    comments: [],
}
