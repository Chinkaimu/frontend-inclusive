import React, { Component } from 'react';
import { connect } from './react-redux';

class ThemeSwitch extends Component {
  render () {
    return (
      <div>
        <button onClick={this.props.onSwitchColor.bind(this,'red')} style={{ color: this.props.themeColor }}>Red</button>
        <button onClick={this.props.onSwitchColor.bind(this, 'blue')} style={{ color: this.props.themeColor }}>Blue</button>
        {/* <button style={{ color: this.props.themeColor }}>Red</button>
        <button style={{ color: this.props.themeColor }}>Blue</button> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchColor: (color) => {
      dispatch({
        type: 'CHANGE_COLOR',
        themeColor: color
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch);