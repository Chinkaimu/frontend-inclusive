import React, { Component } from 'react';
import ThemeSwitch from './ThemeSwitch';
import { connect } from './react-redux';


class Content extends Component {
	render () {
    	return (
			<div>
				<p style={{ color: this.props.themeColor }}>React.js 小书内容</p>
				<ThemeSwitch />
			</div>
			)
		}
}

const mapStateToProps = (state) => {
	return {
		themeColor: state.themeColor,	
	}
}

export default connect(mapStateToProps)(Content);
