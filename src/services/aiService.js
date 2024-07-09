import axios from 'axios';

const API_URL = 'http://localhost:5000/api/claude';
const TIMEOUT = 30000; // 30 seconds

export const generateInitialPrompt = async (topic, difficulty) => {
  try {
    const response = await axios.post(API_URL, {
      model: 'claude-3-sonnet-20240229',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `Generate 3-5 interesting aspects about "${topic}". For each aspect:
1. Provide a short, catchy title (2-3 words max).
2. ${difficulty === 'simple' ? 'Explain this to an 8th grader' : difficulty === 'intermediate' ? 'Explain this to a college student' : 'Explain this to a PhD candidate'} in a 300-450 word explanation.
3. Suggest 2 related topics for further exploration.

Format your entire response as a valid JSON object with the following structure:
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

IMPORTANT: Your entire response must be a valid JSON object. Do not include any text before or after the JSON object. Ensure all keys and values are properly quoted and formatted according to JSON standards.`
        }
      ]
    }, {
      timeout: TIMEOUT,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.content && response.data.content[0]) {
      return JSON.parse(response.data.content[0].text);
    } else {
      throw new Error('Unexpected response structure from Claude API');
    }
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.');
    } else if (error.response) {
      throw new Error(`API error: ${error.response.status} - ${error.response.data.error || 'Unknown error'}`);
    } else if (error.request) {
      throw new Error('No response received from the server. Please check your connection and try again.');
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};