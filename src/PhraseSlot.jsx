import React from 'react';

import './phrase-slots.css';

export const PhraseSlot = props => {
  let className = 'phrase-slot';

  if (props.charObj.char === ' ') {
    className += ' space';
  } else {
    className += ' char';
  }

  return (
    <li className={className}>{props.charObj.guessed ? props.charObj.char : '' }</li>
  );
}
