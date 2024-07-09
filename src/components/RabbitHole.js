import React, { useState, useCallback, useRef } from 'react';
import { debounce } from 'lodash';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import LoadingSpinner from './LoadingSpinner';
import JourneyMap from './JourneyMap';
import LatexMarkdownRenderer from './LatexMarkdownRenderer';
import { generateInitialPrompt } from '../services/aiService';
import { useLearningContext } from '../contexts/LearningContext';
import './RabbitHole.css';
import rabbitholeLogo from '../assets/rabbithole-logo.png';

const MAX_TABS = 6;
const MIN_SEARCH_LENGTH = 3;

const RabbitHole = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [tabs, setTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { addToHistory } = useLearningContext();
  const searchInProgress = useRef(false);

  const handleSearch = useCallback(async (searchTopic) => {
    if (!searchTopic.trim() || searchTopic.length < MIN_SEARCH_LENGTH || isLoading || searchInProgress.current) return;
    
    searchInProgress.current = true;
    setIsLoading(true);
    setError(null);
    setTabs([]); // Reset tabs for new search
    setActiveTabIndex(0);
    
    try {
      console.log('Generating initial prompt for topic:', searchTopic);
      const initialPromptResult = await generateInitialPrompt(searchTopic, difficulty);
      console.log('Initial prompt result:', initialPromptResult);
      
      if (!initialPromptResult || typeof initialPromptResult !== 'object') {
        throw new Error('Invalid response from Claude API');
      }
      
      const parsedOutlines = Object.entries(initialPromptResult).map(([key, value]) => ({
        title: value.title || key,
        content: value.content,
        suggestions: value.suggestions || []
      }));
      
      if (parsedOutlines.length === 0) {
        throw new Error('No outlines were parsed from the initial prompt result');
      }
      
      setTabs(parsedOutlines.slice(0, MAX_TABS));
      addToHistory(searchTopic);
    } catch (error) {
      console.error('Error in handleSearch:', error);
      setError(`An error occurred: ${error.message}. Please try again.`);
    } finally {
      setIsLoading(false);
      searchInProgress.current = false;
    }
  }, [difficulty, addToHistory]);

  const debouncedSearch = useRef(
    debounce((searchTopic) => {
      if (!searchInProgress.current && searchTopic.trim().length >= MIN_SEARCH_LENGTH) {
        handleSearch(searchTopic);
      }
    }, 1000)
  ).current;

  const handleInputChange = (e) => {
    const newTopic = e.target.value;
    setTopic(newTopic);
    debouncedSearch(newTopic);
  };

  const handleSearchClick = () => {
    if (!searchInProgress.current && topic.trim().length >= MIN_SEARCH_LENGTH) {
      handleSearch(topic);
    }
  };

  const handleSuggestionClick = useCallback((suggestion) => {
    if (searchInProgress.current) return;
    setTopic(suggestion);
    handleSearch(suggestion);
  }, [handleSearch]);

  return (
    <div className="rabbit-hole">
      <header className="rabbit-hole-header">
        <img src={rabbitholeLogo} alt="Rabbithole.ai Logo" className="rabbithole-logo" />
        <h2 className="subtitle">A fun personalized learning experience by Ethan Kinnan</h2>
      </header>
      <div className="search-container">
        <input 
          type="text" 
          value={topic} 
          onChange={handleInputChange}
          placeholder={`Enter a topic (min ${MIN_SEARCH_LENGTH} characters)`}
          className="topic-input"
        />
        <select 
          value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)}
          className="difficulty-select"
        >
          <option value="simple">Simple</option>
          <option value="intermediate">Intermediate</option>
          <option value="complex">Complex</option>
        </select>
        <button 
          onClick={handleSearchClick} 
          disabled={isLoading || searchInProgress.current || topic.trim().length < MIN_SEARCH_LENGTH} 
          className="search-button"
        >
          Search
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="content-container">
        {isLoading ? (
          <LoadingSpinner />
        ) : tabs.length > 0 ? (
          <Tabs selectedIndex={activeTabIndex} onSelect={setActiveTabIndex}>
            <TabList>
              {tabs.map((tab, index) => (
                <Tab key={index}>{tab.title}</Tab>
              ))}
            </TabList>
            {tabs.map((tab, index) => (
              <TabPanel key={index}>
                <div className="tab-content">
                  <LatexMarkdownRenderer content={tab.content} />
                </div>
                {tab.suggestions && tab.suggestions.length > 0 && (
                  <div className="suggestions">
                    <h3>Related Topics:</h3>
                    {tab.suggestions.map((suggestion, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="suggestion-button"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </TabPanel>
            ))}
          </Tabs>
        ) : null}
      </div>
      
      <JourneyMap />
    </div>
  );
};

export default RabbitHole;