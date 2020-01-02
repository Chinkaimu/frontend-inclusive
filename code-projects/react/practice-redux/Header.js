import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
    static contextTypes = {
        propA: PropTypes.string,
        store: PropTypes.object,
    }

    constructor () {
        super();
        this.state = {themeColor: ''};
    }

    componentWillMount () {
        this._updateThemeColor();
        const { store } = this.context
        store.subscribe(() => this._updateThemeColor())
    }

    _updateThemeColor () {
        const { store } = this.context;
        const { themeColor } = store.getState(); 
        this.setState({
            themeColor,
        });
    }

    render() {
        return <h1 style={{ color: this.state.themeColor }}>React.js Book</h1>;
    }
}
