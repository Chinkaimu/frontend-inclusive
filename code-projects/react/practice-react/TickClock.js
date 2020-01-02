import React, { Component } from 'react';

export default class TickClock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }
    
    componentWillMount() {
        console.log('componentWillMount');
        this.timer = setInterval(() => {
            this.setState({
                date: new Date()
            })
        }, 1000)
    } 

    // componentDidMount() {
    //     console.log('componentDidMount');
    // }

    // componentWillReceiveProps(nextProps) {
    //     console.log(`componentWillReceiveProps ${nextProps}`)
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(`shouldComponentUpdate ${nextProps} ${nextState}`);
    //     return true;
    // }
    
    // componentWillUpdate(){
    //     console.log('componentWillUpdate');
    // }

    // componentDidUpdate() {
    //     console.log('componentDidUpdate');
    // }

    componentWillUnmount() {
        console.log('componentWillUnmount TickClock');
        clearInterval(this.timer);
    }

    render() {
        // LocaleTimeString 9:34:98
        return <div>{this.state.date.toLocaleTimeString()}</div>;
    }
}
