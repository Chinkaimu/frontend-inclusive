import React, { Component } from 'react';
import ThemeSwitch from './ThemeSwitch';
import PropTypes from 'prop-types';


export default class Content extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor () {
    super()
    this.state = { themeColor: '' }
  }

  componentWillMount () {
    this._updateThemeColor()
    const { store } = this.context
    // 在原生的JS中，这里调用render方法实现，但是React库中应该通过改变状态使得react调用render，如果手动调用就乱套了。关于是否要重新渲染的判断逻辑也交给React去实现。
    store.subscribe(() => this._updateThemeColor())
  }

  _updateThemeColor () {
    const { store } = this.context
    const state = store.getState()
    this.setState({ themeColor: state.themeColor })
  }

  render () {
    return (
      <div>
        <p style={{ color: this.state.themeColor }}>React.js 小书内容</p>
        <ThemeSwitch />
      </div>
    )
  }
}
