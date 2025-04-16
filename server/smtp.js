const nodemailer = require('nodemailer');
require('dotenv').config();

// Konfiguracja serwera SMTP
const mail = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

module.exports = mail;