// models/Chat.js
const mongoose = require('mongoose');

// Define the structure for each message, supporting multiple formats
const MessageSchema = new mongoose.Schema({
  message: { type: String, required: true },      // The actual content of the message
  format: {                                       // Format of the message content
    type: String,
    enum: ['text', 'table', 'code', 'picture'],   // Valid formats
    default: 'text'
  },
  timestamp: { type: Date, default: Date.now }    // Timestamp for each message
});

// Define the structure for the Chat schema
const ChatSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },         // Original URL of the shared conversation
  conversationId: { type: String, required: true },            // Unique identifier for the conversation
  humanMessages: [MessageSchema],                              // Array of human messages
  aiMessages: [MessageSchema],                                 // Array of AI messages
  createdAt: { type: Date, default: Date.now },                // When the conversation was shared
  parsedAt: { type: Date, default: Date.now },                 // When the conversation was parsed
  status: { type: String, default: 'parsed' },                 // Parsing status
  tags: [String],                                              // Tags for categorization (e.g., topics)
  summary: { type: String, default: '' },                      // Short summary of the conversation
  totalTurns: { type: Number, default: 0 }                     // Total number of turns (human + AI messages)
});

module.exports = mongoose.model('Chat', ChatSchema);
