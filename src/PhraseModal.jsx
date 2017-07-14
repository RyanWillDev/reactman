import React from 'react';

import { Btn } from './Btn';

export default class PhraseModal extends React.Component {
  constructor(props) {
    super();

    this.state = {
      visible: false,
      phrase: ''
    };

  }

  togglePhraseVisibility = () => {
    this.setState({ visible: !this.state.visible });
  }

  updatePhrase = (event) => {
    this.setState({ phrase: event.target.value });
  }

  render() {
    return (
      <div>
        <h1>Enter a phrase</h1>
        <input onChange={this.updatePhrase} value={this.state.phrase} type={this.state.visible ? 'text' : 'password' } />
        <Btn clickHandler={this.togglePhraseVisibility} buttonText={this.state.visible ? 'Hide Phrase' : 'Show Phrase'} />
        <Btn clickHandler={() => { this.props.setPhrase(this.state.phrase) }} buttonText="Submit Phrase" />
      </div>
    );
  }
}
