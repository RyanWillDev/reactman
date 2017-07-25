import React from 'react';
import PhraseUtils from './phraseUtils';

import { PhraseSlot } from './PhraseSlot';
import { AlphaBtns } from './AlphaBtns';
import { Btn } from './Btn';

import imgs from './imgs/imgs';

import './hangman.css';


export default class HangmanGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      incorrectGuesses: [],
      phraseMap: PhraseUtils.generatePhraseMap(this.props.phrase),
      phraseGuessed: false
    };
  }

  updateGame = (event) => {
    this.setState(PhraseUtils.diffPhraseMap(this.state, event.target.innerHTML));
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.phraseGuessed
        && !this.state.phraseMap.filter(obj => obj.guessed === false).length) {
      this.setState({ phraseGuessed: true })
    }
  }

  render() {
    return (
      <div>
        {
          this.state.incorrectGuesses.length < 6 && !this.state.phraseGuessed ?
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
          :
          <div>
            <h1>{this.state.phraseGuessed ? 'You won' : 'Game Over'}</h1>
            <h2>{this.state.phraseGuessed ? 'Nice work!' : 'You didn\'t guess the phrase. :('}</h2>
            <Btn buttonText="Play Again" clickHandler={this.props.restartGame} />
          </div>
        }
      </div>
    );
  }
}
