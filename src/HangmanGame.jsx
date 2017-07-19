import React from 'react';

export default class HangmanGame extends React.Component {
  render() {
    return (
      <ul>
        {
          this.props.phrase.split('')
          .map((letter, index) => (
            <li key={index}>{letter}</li>
          ))
        }
      </ul>
    );
  }
}
