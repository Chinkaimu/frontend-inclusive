import React, { Component } from 'React';
import ReactDOM from 'react-dom';
import CommentApp from './comment-app';
import TickClock from './TickClock';

class Practice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showClock: true
        }
    }

    handleShowClock() {
        this.setState({
            showClock: !this.state.showClock,
        })
    }

    render() {
        return <div>
            <h3>评论功能实战</h3>
            <CommentApp />
            <h3>时钟定时</h3> 
            <button onClick={() => {this.handleShowClock()}}>显示/隐藏闹钟</button> 
            {this.state.showClock && <TickClock />}
        </div>
    }
};

ReactDOM.render(<Practice />, document.getElementById('container'));