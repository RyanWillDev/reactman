import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();

    this.state = {
      gameInProgress: false,
    };
  }

  render() {
    return (
      <h1>Let's make a hangman game</h1>
    );
  }
}

export default App;
