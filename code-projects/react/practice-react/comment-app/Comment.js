import React, { Component } from 'react';

export default class Comment extends Component {
    static defaultProps = {
        comment: {
            username: '',
            content: ''
        }
    }
    constructor() {
        super();
        this.state = {timeString: ''};
    }
    componentWillMount() {
        this._updateTimeString();
        this._timer = setInterval(this._updateTimeString.bind(this), 5000);
    }

    _updateTimeString() {
        const {comment} = this.props;
        const duration = (+Date.now() - comment.createdTime)/1000;
        this.setState({
            timeString: duration > 60 ? `${Math.round(duration/60)}分钟前`: `${Math.round(Math.max(duration, 1))}秒前` 
        })
    }

    componentWillUnmount() {
        clearInterval(this._timer);
    }

    render() {
        const {comment} = this.props;
        return <div className='comment'>
        <span className='comment-user'>{comment.username}</span> :
        <span className='comment-content' dangerouslySetInnerHTML={{__html: comment.content}} />
        <button onClick={() => this.props.handleDelete(this.props.index)}>删除</button>
        <div className='comment-createdtime'>
          {this.state.timeString}
        </div>
     </div>;
    }
}



