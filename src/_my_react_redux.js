import React, { Component } from 'react';

// No need to connect directly to store thanks to react's context
// import { store } from './index';

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
// connect - HOC which has been decorated with props giving
// the wrapped component access to store.getState() and store.dispatch
// *****************************************************
export function connect(mapStateToProps, mapDispatchToProps) {
  return function(WrappedComponent) {
    class ConnectedToStore extends Component {
      componentWillMount() {
        this.handleChange(this.props);
        this.unsubscribe = this.context.store.subscribe(() =>
          this.handleChange(this.props)
        );
      }

      handleChange = props => {
        const stateProps = mapStateToProps(
          this.context.store.getState(),
          props
        );

        const dispatchProps = mapDispatchToProps(
          this.context.store.dispatch,
          props
        );

        this.setState({
          ...stateProps,
          ...dispatchProps,
        });
      };

      componentWillReceiveProps(nextProps) {
        this.handleChange(nextProps);
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        return <WrappedComponent {...this.state} {...this.props} />;
      }
    }

    ConnectedToStore.contextTypes = {
      store: PropTypes.object,
    };

    return ConnectedToStore;
  };
}
