import React, { createContext, useContext, useState } from 'react';

const LearningContext = createContext();

export const useLearningContext = () => useContext(LearningContext);

export const LearningProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const addToHistory = (topic) => {
    setHistory(prevHistory => [...prevHistory, topic]);
  };

  return (
    <LearningContext.Provider value={{ history, addToHistory }}>
      {children}
    </LearningContext.Provider>
  );
};