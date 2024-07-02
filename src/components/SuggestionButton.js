import React from 'react';

const SuggestionButton = ({ text, onClick }) => (
  <button className="suggestion-button" onClick={() => onClick(text)}>
    {text}
  </button>
);

export default SuggestionButton;