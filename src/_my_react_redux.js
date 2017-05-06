import React, { Component } from 'react';
import { store } from './index';

import { PropTypes } from 'prop-types';

// *****************************************************
// Provider - use react context to make store available to all children
// *****************************************************
export class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store,
    };
  }

  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: PropTypes.object,
};

// *****************************************************
// connect - HOC which has been decorated with props giving access to
// store.getState() and store.dispatch
// *****************************************************
export function connect(mapStateToProps, mapDispatchToProps) {
  return function(WrappedComponent) {
    return class extends Component {
      componentDidMount() {
        this.unsubscribe = store.subscribe(this.handleChange.bind(this));
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      handleChange() {
        this.forceUpdate();
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            // spreading state as props
            {...mapStateToProps(store.getState(), this.props)}
            // spreading dispatch (wrapping action creators) as props
            {...mapDispatchToProps(store.dispatch, this.props)}
          />
        );
      }
    };
  };
}
