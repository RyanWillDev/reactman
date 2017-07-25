import React from 'react';
import PhraseUtils from './phraseUtils';

import { PhraseSlot } from './PhraseSlot';
import { AlphaBtns } from './AlphaBtns';

import imgs from './imgs/imgs';

import './hangman.css';


export default class HangmanGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      incorrectGuesses: [],
      phraseMap: PhraseUtils.generatePhraseMap(this.props.phrase)
    };
  }

  updateGame = (event) => {
    this.setState(PhraseUtils.diffPhraseMap(this.state, event.target.innerHTML));
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div>
           <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {
              this.state.phraseMap.map((charObj, i) => (<PhraseSlot key={i} charObj={charObj} />))
            }
          </ul>

          <AlphaBtns updateGame={this.updateGame} />
        </div>
        <div className="hangman-img" style={{ backgroundImage: `url(${imgs[this.state.incorrectGuesses.length]})`}}>
        </div>
      </div>
    );
  }
}
