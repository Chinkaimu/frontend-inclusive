import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from './react-redux';

class Header extends Component {
    render() {
        return <h1 style={{ color: this.props.themeColor }}>React.js Book</h1>;
    }
}

// state从store中获取，获取组件需要使用的状态值
const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}

export default connect(mapStateToProps)(Header);
