import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Content from './Content';
import { createStore, Provider } from './react-redux';

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
    render() {
        return <Provider store={store}>
            <Header />
            <Content />
        </Provider>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container2')
);