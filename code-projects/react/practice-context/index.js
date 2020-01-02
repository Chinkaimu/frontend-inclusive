import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class MiddleComponent extends Component {
    render() {
        return <div>MiddleComponent<ChildComponent /></div>
    }
}

class ChildComponent extends Component {
    static contextTypes = {
        propA: PropTypes.string,
    }

    render() {
        const { propA } = this.context;

        return <div>
            ChildComponent
            <div>{propA}</div>
        </div>;
    }
}

class ParentComponent extends Component {
    static childContextTypes = {
        propA: PropTypes.string,
        methodA: PropTypes.func,
    }

    getChildContext() {
        return {
            propA: 'propA',
        }
    }

    render() {
        return <div>
            <MiddleComponent />
            <ChildComponent />
        </div>
    }
}

ReactDOM.render(<ParentComponent />, document.getElementById('container'));