///////////////////////////////////////
// CONTROLLER HANDLES HTTP REQUESTS //
// REFERS TO SENDING MAIL AND       //
//      SMTP HANDLING               //
//////////////////////////////////////

// imports

const getTestTransporter = require("../smtp");
// const mail = require("../smtp")
const mjml = require("mjml");
const fs = require("fs");
require('dotenv').config();
const nodemailer = require('nodemailer');

// method send email to candidate with his result

exports.sendMail = async (req, res, next) => {

    const { imie, nazwisko, kierunek, email } = req.body;
    
    // read the email tamplate 

    const mjmlTamplate = fs.readFileSync("../server/views/email.mjml", "utf8");

    // put candidate data into the template

    const mjmlWithData = mjmlTamplate
        .replace("{{imie}}", `${imie}`)
        .replace("{{nazwisko}}", `${nazwisko}`)
        .replace("{{kierunek}}", `${kierunek}`);

    // conversion of mjml file to html file
    
    const htmlOutput = mjml(mjmlWithData).html;

    ////////////////////////////////////////
    // SEND EMAIL BY ACADEMIC SMTP SERVER //
    ////////////////////////////////////////

    // // data needed to send email
    // const mailOptions = {
    //     from: process.env.SMTP_USER,
    //     to: email,
    //     subject: `Twój wybrany kierunek!`,
    //     html: htmlOutput
    // };

    // try {
    //     // send email
    //     await mail.sendMail(mailOptions);
    //     res.status(200).json({ message: 'E-mail wysłany!' });
    // } catch (error) {
    //     res.status(500).json({ message: 'Błąd podczas wysłania e-maila.', error });
    // }

    ////////////////////////////////
    // SEND EMAIL BY TEST ACCOUNT //
    ////////////////////////////////

    const transporter = await getTestTransporter();

    // data needed to send email

    const mailOptions = {
        from: '"Test User" <test@example.com>',
        to: email,
        subject: `Twój wybrany kierunek!`,
        html: htmlOutput
    };

    try {

        // send email by test account
        // email can be seen on getMassageUrl(info) address

        const info = await transporter.sendMail(mailOptions);
        //console.log('Message sent:', info.messageId);
        //console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
        res.status(200).json({ 
            message: 'E-mail wysłany!',
            url: nodemailer.getTestMessageUrl(info)
         });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Błąd podczas wysłania e-maila.', error });
    }
}