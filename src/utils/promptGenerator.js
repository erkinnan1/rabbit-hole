const difficultyLevels = {
    simple: "Explain this to an 8th grader",
    intermediate: "Explain this to a college student",
    complex: "Explain this to a PhD candidate"
  };
  
  export const prompts = {
    initialPrompt: (topic, difficulty) => `Generate 3-5 interesting aspects about "${topic}". For each aspect:
  1. Provide a short, catchy title (2-3 words max).
  2. ${difficultyLevels[difficulty]} in a 300-450 word explanation using LaTeX format.
  3. Suggest 2 related topics for further exploration.
  
  Format the response as a valid JSON object with the following structure:
  {
    "aspect1": {
      "title": "Short Title",
      "content": "Markdown formatted content. Use ** for bold, * for italic, and standard Markdown syntax for headers, lists, etc. For mathematical equations, use single $ for inline and $$ for display equations.",
      "suggestions": ["Topic 1", "Topic 2"]
    },
    "aspect2": {
      "title": "Another Title",
      "content": "More Markdown formatted content...",
      "suggestions": ["Topic 3", "Topic 4"]
    }
  }
  
  IMPORTANT: Your entire response must be a valid JSON object. Do not include any text before or after the JSON object. Ensure all keys and values are properly quoted and formatted according to JSON standards.`,
  
    tabContentPrompt: (topic, outlinePoint, difficulty) => `Provide an in-depth exploration of the following aspect of "${topic}":
  
  ${outlinePoint}
  
  ${difficultyLevels[difficulty]} in a 200-300 word response. Format your response in LaTeX, including equations, lists, and emphasis where appropriate. Include relevant examples, historical context, current applications, and future implications.
  
  Format the response as a valid JSON object with the following structure:
  {
    "title": "Short Title",
    "content": "More Markdown formatted content...",
    "suggestions": ["Topic 1", "Topic 2"]
  }
  
  IMPORTANT: Your entire response must be a valid JSON object. Do not include any text before or after the JSON object. Ensure all keys and values are properly quoted and formatted according to JSON standards.`,
  
    newPromptsGenerator: (tabContent) => `Based on the following content about a topic, generate 2 new interesting subject prompts that a user might want to explore next. These should be related but not directly covered in the given content. Your response should be a valid JSON object with the following structure:
  
  {
    "suggestions": ["New Topic 1", "New Topic 2"]
  }
  
  Content:
  ${tabContent}
  
  IMPORTANT: Your entire response must be a valid JSON object. Do not include any text before or after the JSON object. Ensure all keys and values are properly quoted and formatted according to JSON standards.`
  };