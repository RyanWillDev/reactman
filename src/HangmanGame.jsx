import React from 'react';

import { PhraseSlot } from './PhraseSlot';
import { AlphaBtns } from './AlphaBtns';

import PhraseUtils from './phraseUtils';

export default class HangmanGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      incorrectGuesses: [],
      phraseMap: PhraseUtils.generatePhraseMap(this.props.phrase)
    };
  }

  updateGame = (event) => {
    this.setState(PhraseUtils.diffPhraseMap(this.state, event.target.innerHTML))
  }

  render() {
    return (
      <div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            this.state.phraseMap.map((charObj, i) => ( <PhraseSlot key={i} charObj={charObj} />))
          }
        </ul>

        <AlphaBtns updateGame={this.updateGame} />

        <span>{this.state.incorrectGuesses.join(' ')}</span>
      </div>
    );
  }
}
