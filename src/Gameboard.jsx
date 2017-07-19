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

  render() {
    return (
      <div>
        {
          this.state.phrase.length ? <HangmanGame phrase={this.state.phrase} />
          : <PhraseModal setPhrase={this.setPhrase} />
        }
      </div>
    );
  }
}
