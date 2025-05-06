const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/config');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routers'));

// Error handling middleware
app.use(errorHandler);

const PORT = config.server.port;

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});

module.exports = app; 