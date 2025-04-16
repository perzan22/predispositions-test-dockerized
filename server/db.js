// Import potrzebnych bibliotek
require('dotenv').config();
const { Pool } = require('pg');

// Nowa instancja puli połaczeń
const db = new Pool({
    // Konfiguracja puli połączeń zapisana jest w pliku .env
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

module.exports = db;