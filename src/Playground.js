import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from './_my_redux';
import { changeSync } from './02_actions';

import './Playground.css';

class Playground extends Component {
  changeTheme = () => {
    const nextTheme = this.props.theme === 'light' ? 'dark' : 'light';
    this.props.changeSync(nextTheme);
  };

  render() {
    // console.log('in playground', this.props.theme);
    return (
      <div>

        <h2>Click on sync square</h2>
        <div
          className={`square square__sync--${this.props.theme}`}
          onClick={this.changeTheme}
        >
          <p>{this.props.theme}</p>
        </div>

        <h2>Click on async square</h2>
        <img className="square" src="" alt="placeholder" />
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   theme: state.theme,
// });
//

const mapStateToProps = state => {
  // console.log('Playground', state);
  return {
    theme: state.theme,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ changeSync }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Playground);
