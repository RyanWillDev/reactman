import React from 'react';

import { Btn } from './Btn';

import alphabet from './alphabet';

export const AlphaBtns = props => {
  return (
    <ul style={{ width: '100%' }} onClick={event => { props.updateGame(event); event.target.disabled = true; }}>
      {
        alphabet.map((letter, i) => ( <Btn key={i} buttonText={letter} /> ))
      }
    </ul>
  );
};
