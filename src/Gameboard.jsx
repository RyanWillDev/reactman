import React from 'react';

import PhraseModal from './PhraseModal';
import HangmanGame from './HangmanGame';


export default class Gameboard extends React.Component {
  constructor() {
    super();

    this.state = {
      phrase: '',
    };
  }

  setPhrase = (phrase) => {
    this.setState({ phrase });
  }

  restartGame = () => {
    this.setState({ phrase: '' });
  }

  render() {
    return (
      <div>
        {
          this.state.phrase.length ? <HangmanGame restartGame={this.restartGame} phrase={this.state.phrase} />
          : <PhraseModal setPhrase={this.setPhrase} />
        }
      </div>
    );
  }
}
