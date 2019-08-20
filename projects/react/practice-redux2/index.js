import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Header from './Header';
import Content from './Content';
import { createStore } from './react-redux';

function themeReducer(state, action) {
    // 默认状态
    if(!state) return {
        themeColor: 'red'
    }
    switch(action.type) {
        case 'CHANGE_COLOR': return {
            ...state,
            themeColor: action.themeColor
        };
        default: 
            return state;
    }
}

const store = createStore(themeReducer);

class App extends Component {
    // 注意是 childContextTypes
    static childContextTypes = {
        propA: PropTypes.string,
        store: PropTypes.object,
    }

    getChildContext() {
        return {
            propA: 'propA',
            store: store,
        }
    }

    render() {
        return <div>
            <Header />
            <Content />
        </div>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container2')
);