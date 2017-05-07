import React, { Component } from 'react';

import { connect } from './_my_react_redux';
// import { connect } from './+my_react_redux';
// import { connect } from 'react-redux';
//
import { bindActionCreators } from './_my_redux';
// import { bindActionCreators } from './+my_redux';
// import { bindActionCreators } from 'redux';

import { changeSync } from './02_actions';

class Playground extends Component {
  changeTheme = () => {
    const nextTheme = this.props.theme === 'light' ? 'dark' : 'light';
    this.props.changeSync(nextTheme);
  };

  render() {
    return (
      <div>

        <h2>Sync action</h2>
        <div
          className={`square square__sync--${this.props.theme}`}
          onClick={this.changeTheme}
        >
          <p>Click to dispatch a sync action</p>
          <p>{this.props.theme}</p>
          <p>{this.props.counter}</p>
        </div>

        <h2>TBC - Click on async square</h2>
        <img className="square" src="" alt="placeholder" />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    theme: ownProps.counter % 2 === 0 ? 'color' : state.theme,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ changeSync }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Playground);
