import React, { Component } from 'react';
import { connect } from './react-redux';

class ThemeSwitch extends Component {
  // componentWillMount () {
  //   this._updateThemeColor()
  //   const { store } = this.context
  //   store.subscribe(() => this._updateThemeColor())
  // }

  // _updateThemeColor () {
  //   const { store } = this.context
  //   const state = store.getState()
  //   this.setState({ themeColor: state.themeColor })
  // }

  handleSwitchColor (color) {
    this.props.dispatch({
      type: 'CHANGE_COLOR',
      themeColor: color
    });
  }

  render () {
    return (
      <div>
        <button onClick={this.handleSwitchColor.bind(this, 'red')} style={{ color: this.props.themeColor }}>Red</button>
        <button onClick={this.handleSwitchColor.bind(this, 'blue')} style={{ color: this.props.themeColor }}>Blue</button>
        {/* <button style={{ color: this.props.themeColor }}>Red</button>
        <button style={{ color: this.props.themeColor }}>Blue</button> */}
      </div>
    )
  }
}

export default connect(ThemeSwitch);