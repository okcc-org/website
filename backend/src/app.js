const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/config');
const errorHandler = require('./middleware/errorHandler');
const passport = require('./config/passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');
const {webhookHandler} = require('./controllers/webhookController')


const app = express();

// Middleware
app.use(helmet());
app.use(cors(config.cors));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Initialize Passport
app.use(passport.initialize());

app.post('/api/webhook', express.raw({type: 'application/json'}), webhookHandler); // webhook for stripe, before json middleware for a reason
app.use(express.json());



// For testing
// Routes
// app.get('/', (req, res) => {
//   res.send('<a href="/api/auth/google">Login with Google</a>');
// });
// app.get('/google', (req, res) => {
//   res.send('<a href="/api/auth/google/signup">Signup with Google</a>');
// });
app.use('/api', require('./routes'));


// Error handling middleware
app.use(errorHandler);

const PORT = config.server.port;

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});

module.exports = app; 