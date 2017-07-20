import React from 'react';

import { PhraseSlot } from './PhraseSlot';

import PhraseUtils from './phraseUtils';

export default class HangmanGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      incorrectGuesses: [],
      phraseMap: PhraseUtils.generatePhraseMap(this.props.phrase)
    };


    document.onkeypress = (e) => this.updateGame(e.key);
  }

  updateGame(guess) {
    this.setState(PhraseUtils.diffPhraseMap(this.state, guess))
  }

  render() {
    return (
      <div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            this.state.phraseMap.map((charObj, i) => ( <PhraseSlot key={i} charObj={charObj} />))
          }
        </ul>
        
        <span>{this.state.incorrectGuesses.join(' ')}</span>
      </div>
    );
  }
}
