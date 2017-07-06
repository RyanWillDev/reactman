import React, { Component } from 'react';

import { Btn } from './Btn';
import Gameboard from './Gameboard';

const startGameBtnStyle = {
  backgroundColor: '#09ba52',
  color: 'white',
  borderRadius: 5,
  width: 100,
  height: 50,
  fontSize: '1.15em',
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      gameInProgress: false,
    };
  }

  startGame = () => {
    this.setState({ gameInProgress: true });
  }

  render() {
    return (
      <div>
        {
          this.state.gameInProgress ? <Gameboard />
          : <Btn style={startGameBtnStyle} buttonText="Start Game" clickHandler={this.startGame} />
        }
      </div>
    );
  }
}

export default App;
