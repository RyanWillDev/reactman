import React from 'react';

export const Btn = ({ style, clickHandler, buttonText }) => (
  <button style={style} onClick={clickHandler}>{buttonText}</button>
);
