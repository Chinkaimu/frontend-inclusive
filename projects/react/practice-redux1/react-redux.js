import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const createStore = (reducer) => {
    let state = null;
    const listeners = [];
    const getState = () => {return state;}
    const subscribe = (listener) => { listeners.push(listener) };
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => {
            listener();
        })
    }
    dispatch();
    return { getState, subscribe, dispatch };
}

export const connect = (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object,
        }

        constructor () {
            super()
            this.state = null
        }

        componentWillMount () {
            const { store } = this.context
            this._updateState()
            store.subscribe(() => this._updateState())
          }

        _updateState () {
            const { store } = this.context
            const state = store.getState() 
            this.setState ({
                ...state
            })  
        }

        dispatch (action) {
            const { store } = this.context
            store.dispatch(action)
        }

        render () {
            return <WrappedComponent { ...this.state } dispatch={this.dispatch.bind(this)}/> 
        }
    }

    return Connect;
} 

export default { createStore, connect };