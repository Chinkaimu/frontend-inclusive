import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from './react-redux';

class Header extends Component {
    render() {
        return <h1 style={{ color: this.props.themeColor }}>React.js Book</h1>;
    }
}

export default connect(Header);
