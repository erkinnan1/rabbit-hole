const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/claude', async (req, res) => {
  try {
    console.log('Received request:', req.body);
    const response = await axios.post('https://api.anthropic.com/v1/messages', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      }
    });
    console.log('Claude API response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error calling Claude API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while calling the Claude API', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});