const nodemailer = require('nodemailer');
require('dotenv').config();

////////////////////////////////
//  Konfiguracja serwera SMTP //
////////////////////////////////

// const mail = nodemailer.createTransport({
//     host: process.env.SMTP_SERVER,
//     port: Number(process.env.SMTP_PORT),
//     secure: false,
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASSWORD
//     }
// });

/////////////////////////////////
// Konfiguracja testowego SMTP //
/////////////////////////////////

const getTestTransporter = async () => {
    try {
        // Tworzenie testowego konta SMTP
        const account = await nodemailer.createTestAccount();

        // Tworzenie transportera na podstawie danych konta
        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        return transporter;
    } catch (error) {
        console.error('Error creating test SMTP account:', error);
        throw error;  // Wyrzuć błąd, aby obsłużyć go w wywołującym kodzie
    }
};


// Eksport połączenia do serwera SMTP
module.exports = getTestTransporter;