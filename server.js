// server.js

// Import dependencies
require('dotenv').config();
console.log("Mongo URI:", process.env.MONGO_URI);  // Add this line to check the value
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');


// Create an Express application
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Port for the server
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define the routes after defining `app`
// This is an example route; make sure you have the Chat model and other details set up
app.post('/api/parse', async (req, res) => {
  const { link } = req.body;
  try {
    const response = await axios.get(link);
    const parsedData = {
      human: "Sample Human Input",
      ai: "Sample AI Response"
    };
    
    // Use your MongoDB Chat model here (this is a placeholder example)
    // const chat = new Chat({ url: link, human: parsedData.human, ai: parsedData.ai });
    // await chat.save();

    res.status(200).json({ message: 'Chat successfully saved!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to parse link', error: error.message });
  }
});

// Example route to get all chats (adjust this according to your model)
app.get('/api/chats', async (req, res) => {
  try {
    // Replace with your MongoDB query
    // const chats = await Chat.find();
    // res.json(chats);
    res.json([]);  // Temporary placeholder response
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving chats', error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
