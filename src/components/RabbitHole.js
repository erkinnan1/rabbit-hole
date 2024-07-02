import React, { useState, useCallback } from 'react';
import TopicTab from './TopicTab';
import LoadingSpinner from './LoadingSpinner';
import { generateInitialPrompt, generateTabContent, generateNewPrompts } from '../services/aiService';
import { parseOutlines, parseNewPrompts } from '../utils/contentParser';
import { useLearningContext } from '../contexts/LearningContext';
import useDebounce from '../hooks/useDebounce';

const RabbitHole = () => {
  const [topic, setTopic] = useState('');
  const [tabs, setTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToHistory } = useLearningContext();
  const debouncedTopic = useDebounce(topic, 300);

  const handleSearch = useCallback(async () => {
    if (!debouncedTopic.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const initialPromptResult = await generateInitialPrompt(debouncedTopic);
      const parsedOutlines = parseOutlines(initialPromptResult);
      
      const newTabsPromises = parsedOutlines.map(async (outline) => {
        const content = await generateTabContent(debouncedTopic, outline.title);
        const newPromptsRaw = await generateNewPrompts(content);
        const suggestions = parseNewPrompts(newPromptsRaw);
        return {
          title: outline.title,
          content: content,
          suggestions: suggestions
        };
      });
      
      const newTabs = await Promise.all(newTabsPromises);
      setTabs(newTabs);
      addToHistory(debouncedTopic);
    } catch (error) {
      console.error('Error generating content:', error);
      setError('An error occurred while fetching content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [debouncedTopic, addToHistory]);

  const handleSuggestionClick = useCallback((suggestion) => {
    setTopic(suggestion);
    handleSearch();
  }, [handleSearch]);

  return (
    <div className="rabbit-hole">
      <input 
        type="text" 
        value={topic} 
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic"
      />
      <button onClick={handleSearch} disabled={isLoading}>Search</button>
      
      {error && <div className="error-message">{error}</div>}
      
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        tabs.map((tab, index) => (
          <TopicTab 
            key={index}
            title={tab.title}
            content={tab.content}
            suggestions={tab.suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        ))
      )}
    </div>
  );
};

export default RabbitHole;