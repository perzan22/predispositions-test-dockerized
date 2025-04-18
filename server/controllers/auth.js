///////////////////////////////////////////
// CONTROLLER HANDLES HTTP REQUESTS      //
//      REFERS TO AUTHENTICATION         //
///////////////////////////////////////////

// database import 

const db = require('../db')
require('dotenv').config();

// authentication imports

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// method logs in admin after putting right credentials

exports.login = async (req, res, next) => {

    const { login, password } = req.body;

    // find proper admin in database

    const query = `SELECT * FROM administrator WHERE login = $1`;
    
    const admin = await db.query(query, [login]);

    if (admin.rows.length == 0) {
        return res.status(404).json({ message: 'Niepoprawny login!' });
    }

    // compare password with encrypted pass in database

    const isPasswordValid = await bcrypt.compare(password, admin.rows[0].haslo);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Niepoprawne hasło!' });
    }

    // create login token for one hour

    const token = jwt.sign({ login: login }, `${process.env.TOKEN}`, { expiresIn: '1h' });

    res.status(200).json({
        message: 'Zalogowano pomyślnie!',
        token: token,
        adminID: admin.rows[0].id_admin
    });
}

// method changes password of concrete admin in database

exports.changePassword = async (req, res, next) => {
    const { actualPass, newPass, adminID } = req.body;

    const query = `SELECT * FROM administrator WHERE id_admin = $1`;

    const admin = await db.query(query, [adminID]);

    if (admin.rows.length == 0) {
        return res.status(404).json({ message: 'Nieznaleziono admina!' });
    }

    // check if old password is correct

    const oldPassword = admin.rows[0].haslo;
    return bcrypt.compare(actualPass, oldPassword).then(result => {
        if (!result) {
            return res.status(401).json({ message: 'Niepoprawne aktualne hasło!' })
        }

        // encrypt new password

        bcrypt.hash(newPass, 10).then(async hash => {
            admin.password = hash;

            // change password in database

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

// method adds new admin to database

exports.addAdmin = async (req, res, next) => {

    const { login, password } = req.body;

    // encrypt password of new admin

    bcrypt.hash(password, 10).then(hash => {

        // add new admin to databse

        const query = `INSERT INTO administrator (login, haslo) VALUES ($1, $2)`;

        const result = db.query(query, [login, hash]);

        if (result) {
            res.status(200).json({ message: `Dodano administratora ${login}` });
        } else {
            res.status(404).json({ message: 'Nie udało się dodać nowego administratora.' });
        }
    });
    
}