const mail = require("../smtp");
const mjml = require("mjml");
const fs = require("fs");
require('dotenv').config();

exports.sendMail = async (req, res, next) => {

    // Dane kandydata
    const { imie, nazwisko, kierunek, email } = req.body;
    
    // Przesłanie szablonu maila z pliku .mjml
    const mjmlTamplate = fs.readFileSync("../server/views/email.mjml", "utf8");

    // Wprowadzenie danych do szablonu
    const mjmlWithData = mjmlTamplate
        .replace("{{imie}}", `${imie}`)
        .replace("{{nazwisko}}", `${nazwisko}`)
        .replace("{{kierunek}}", `${kierunek}`);

    // Konwersja pliku mjml na html
    const htmlOutput = mjml(mjmlWithData).html;

    // Atrynuty potrzebne do wysłania maila
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: `Twój wybrany kierunek!`,
        html: htmlOutput
    };

    try {
        // Funkcja wysyłająca maila
        await mail.sendMail(mailOptions);
        res.status(200).json({ message: 'E-mail wysłany!' });
    } catch (error) {
        res.status(500).json({ message: 'Błąd podczas wysłania e-maila.', error });
    }
}