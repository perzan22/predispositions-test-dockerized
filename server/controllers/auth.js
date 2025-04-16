const db = require('../db')
require('dotenv').config();

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res, next) => {

    const { login, password } = req.body;

    const query = `SELECT * FROM administrator WHERE login = $1`;
    
    const admin = await db.query(query, [login]);

    if (admin.rows.length == 0) {
        return res.status(404).json({ message: 'Niepoprawny login!' });
    }

    // Porównanie wpisanego hasła z poprawnym
    const isPasswordValid = await bcrypt.compare(password, admin.rows[0].haslo);
    // Jeśli niepoprawne hasło to zwróć błąd
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Niepoprawne hasło!' });
    }

    // Utworzenie tokena JWT
    const token = jwt.sign({ login: login }, `${process.env.TOKEN}`, { expiresIn: '1h' });

    res.status(200).json({
        message: 'Zalogowano pomyślnie!',
        token: token,
        adminID: admin.rows[0].id_admin
    });
}

exports.changePassword = async (req, res, next) => {
    const { actualPass, newPass, adminID } = req.body;

    const query = `SELECT * FROM administrator WHERE id_admin = $1`;

    const admin = await db.query(query, [adminID]);

    if (admin.rows.length == 0) {
        return res.status(404).json({ message: 'Nieznaleziono admina!' });
    }

    const oldPassword = admin.rows[0].haslo;
    return bcrypt.compare(actualPass, oldPassword).then(result => {
        if (!result) {
            return res.status(401).json({ message: 'Niepoprawne aktualne hasło!' })
        }

        bcrypt.hash(newPass, 10).then(async hash => {
            admin.password = hash;

            const updateQuery = `UPDATE administrator SET haslo = $1 WHERE id_admin = $2`;
            const result = await db.query(updateQuery, [hash, adminID]);
            if (result) {
                res.status(200).json({ message: 'Zaktualizowano hasło!' })
            } else {
                res.status(401).json({ message: 'Nie udało się zaktualizować hasła!' })
            }

        })

    })
}

// Funkcja dodająca nowego administratora
exports.addAdmin = async (req, res, next) => {
    // Dane administratora przekazane w ciele żądania
    const { login, password } = req.body;

    // Zahaszowanie hasła
    bcrypt.hash(password, 10).then(hash => {

        // Nowy administrator ma zapisane zahaszowane hasło
        const query = `INSERT INTO administrator (login, haslo) VALUES ($1, $2)`;

        // Wykonanie polecenia
        const result = db.query(query, [login, hash]);

        // Jeśli polecenie się powiodło to informacja o dodaniu administratora
        if (result) {
            res.status(200).json({ message: `Dodano administratora ${login}` });
        } else {
            // W przypadku niepowodzenia informacja o błedzie
            res.status(404).json({ message: 'Nie udało się dodać nowego administratora.' });
        }
    });
    
}