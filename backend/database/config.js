require('dotenv').config();

module.exports = 
{
  "development": {
    url: process.env.DEV_PGDATABASE_URL,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": "olraketaroced",
    "database": "decoratekarlo",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": "olraketaroced",
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
