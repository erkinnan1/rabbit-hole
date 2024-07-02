import React from 'react';
import SuggestionButton from './SuggestionButton';

const TopicTab = ({ title, content, suggestions, onSuggestionClick }) => (
  <div className="topic-tab">
    <h3>{title}</h3>
    <p>{content}</p>
    <div className="suggestions">
      {suggestions.map((suggestion, index) => (
        <SuggestionButton 
          key={index} 
          text={suggestion} 
          onClick={onSuggestionClick}
        />
      ))}
    </div>
  </div>
);

export default TopicTab;