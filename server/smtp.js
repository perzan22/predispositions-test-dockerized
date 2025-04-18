/////////////////////////////
// SMTP CONFIGURATION FILE // 
/////////////////////////////

// import nodemailer to handle smtp requests

const nodemailer = require('nodemailer');
require('dotenv').config();

///////////////////////////////
// PROPER SMTP SERVER CONFIG //
///////////////////////////////

// const mail = nodemailer.createTransport({
//     host: process.env.SMTP_SERVER,
//     port: Number(process.env.SMTP_PORT),
//     secure: false,
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASSWORD
//     }
// });

/////////////////////////////
// TEST SMTP SERVER CONFIG //
/////////////////////////////

const getTestTransporter = async () => {
    try {

        // create test smtp account

        const account = await nodemailer.createTestAccount();

        // create transport to config smtp

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
        throw error; 
    }
};

module.exports = getTestTransporter;