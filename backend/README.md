# OKCC Website Backend

Backend server for the OKCC website.

## Project Structure

```
src/
├── config/       # Configuration files
├── controllers/  # Route controllers
├── docs/         # API documentation
├── middleware/   # Custom middleware
├── models/       # Data models
├── prisma/       # Prisma schema
├── routers/      # Route definitions
├── services/     # External service integrations
├── uploads/      # File uploads
└── utils/        # Utility functions
```

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install PostgreSQL:
   - Windows: Download and install from [PostgreSQL download page](https://www.postgresql.org/download/windows/)
   - macOS: Install using `brew install postgresql`
   - Linux (Ubuntu/Debian): Install using `sudo apt-get install postgresql postgresql-contrib`

3. PostgreSQL Setup:
   - Set password for default 'postgres' user
   - Connect to psql: `psql -U postgres`
   - Create database: `CREATE DATABASE okcc_db`
   - Verify database: `\l`

4. Install dependencies:
```bash
npm install
```
5. Database setup
```bash
# Create database tables
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

6. Create .env file and set required environment variables:
```
DB_URL=postgresql://postgres:<yourpassword>@localhost:5432/okcc_db
PORT=8080
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1h

# MailChimp
MAILCHIMP_API_KEY=your_api_key
MAILCHIMP_SERVER_PREFIX=your_prefix
MAILCHIMP_LIST_ID=your_list_id

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
GOOGLE_SIGNUP_CALLBACK_URL=

# Cloud
STORAGE_TYPE=local
```

7. Start the server:
```bash
npm run start
```

8. To develop with Stripe api and forward webhook requests to the local server run this command with the Stripe CLI: 
   stripe listen --forward-to localhost:8080/api/webhook


## API Documentation
- API documentation using Swagger UI
- Access URL: `http://localhost:8080/api-docs`

## Technology Stack
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Google OAuth2.0
- Mailchimp API
