# OKCC Website Backend

Backend server for the OKCC website.

## Project Structure

```
src/
├── app.js              # Application entry point
├── config/             # Configuration files
├── controllers/        # Controllers
├── models/             # Database models
├── routes/             # Routes
├── services/           # Business logic
├── utils/              # Utility functions
└── middleware/         # Custom middleware
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

5. Create .env file and set required environment variables:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=okcc_db
DB_USER=postgres
DB_PASSWORD=your_password
```

6. Start the server:
```bash
npm run start
```

## API Endpoints


## Technology Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize
- JWT
