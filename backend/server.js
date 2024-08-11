// server.js
const express = require('express');
const next = require('next');
const mongoose = require('mongoose'); // If using MongoDB
const bodyParser = require('body-parser'); // To parse incoming request bodies

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Connect to MongoDB (Replace the connection string with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.prepare().then(() => {
  const server = express();

  // Middleware
  server.use(bodyParser.json()); // For parsing application/json

  // Example custom route
  server.get('/p/:id', (req, res) => {
    const actualPage = '/post';
    const queryParams = { id: req.params.id };
    app.render(req, res, actualPage, queryParams);
  });

  // Default catch-all handler to allow Next.js to handle all other routes
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

