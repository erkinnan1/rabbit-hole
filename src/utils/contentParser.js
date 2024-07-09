export const parseOutlines = (initialPromptResult) => {
    return Object.entries(initialPromptResult).map(([key, value]) => ({
      title: value.title,
      content: value.content,
      suggestions: value.suggestions
    }));
  };
  
  export const parseNewPrompts = (newPromptsRaw) => {
    return newPromptsRaw.suggestions;
  };