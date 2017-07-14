import React from 'react';

import PhraseModal from './PhraseModal';


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
      <PhraseModal setPhrase={this.setPhrase} />
    );
  }
}
