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

export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
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
            this._updateProps()
            store.subscribe(() => this._updateProps())
          }

        _updateProps () {
            const { store } = this.context
            let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {}
            let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.props) : {}
            this.setState ({
                allProps: {
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props,
                }
            })  
        }

        render () {
            return <WrappedComponent {...this.state.allProps}/> 
        }
    }

    return Connect;
} 

export default { createStore, connect };