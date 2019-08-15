import React, { Component } from 'react';

export default class TickClock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    componentWillMount() {
        this.timer = setInterval(() => {
            this.setState({
                date: new Date()
            })
        }, 1000)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount TickClock');
        clearInterval(this.timer);
    }

    render() {
        // LocaleTimeString 9:34:98
        return <div>{this.state.date.toLocaleTimeString()}</div>;
    }
}
