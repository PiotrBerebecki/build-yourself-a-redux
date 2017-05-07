import React, { Component } from 'react';
import Playground from './Playground';

class App extends Component {
  state = {
    counter: 1,
  };

  handleClick = () => {
    this.setState(prevState => ({
      counter: prevState.counter + 1,
    }));
  };
  render() {
    // console.log(this.state.counter);
    return (
      <div>
        <h1>Build yourself a redux</h1>
        <button onClick={this.handleClick}>
          Click to send a prop
        </button>
        <Playground counter={this.state.counter} />
      </div>
    );
  }
}

export default App;
