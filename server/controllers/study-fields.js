//////////////////////////////////////
// CONTROLLER HANDLES HTTP REQUESTS //
//    REFERS TO FIELDS OF STUDY     //
//////////////////////////////////////

// import database

const db = require('../db')

// method returns all study fields from database

exports.getStudyFields = async (req, res, next) => {
    const query = `SELECT * FROM kierunek`;
    const result = await db.query(query);
    if (result) {
        res.status(200).json({
            studyFields: result.rows,
            message: 'Kierunki znalezione!'
        })
    } else {
        res.status(404).json({ message: 'Nie znaleziono kierunków' })
    }
}

// method returns specific field of study based on id

exports.getStudyField = async (req, res, next) => {
    const id_kierunku = req.query.id_kierunku
    const query = `SELECT * FROM kierunek WHERE id_kierunku = $1`;
    const values = [id_kierunku]
    const studyField = (await db.query(query, values)).rows[0];
    if (studyField) {
        res.status(200).json({
            id_kierunku: studyField.id_kierunku,
            nazwa: studyField.nazwa,
            wydzial: studyField.wydzial,
            x: studyField.x,
            y: studyField.y
        })
    } else {
        res.status(404).json({ message: 'Nie znaleziono kierunku' })
    }
}

// mathod adds new field of study to database

exports.addStudyField = async (req, res, next) => {
    const studyField = {
        nazwa: req.body.nazwa,
        wydzial: req.body.wydzial,
        x: +req.body.x,
        y: +req.body.y
    };

    const query = `INSERT INTO kierunek (nazwa, wydzial, x, y) VALUES ($1, $2, $3, $4)`;
    const values = [studyField.nazwa, studyField.wydzial, studyField.x, studyField.y];

    try {
        const result = await db.query(query, values);
        res.status(201).json({
            message: 'Kierunek dodany pomyślnie!',
            studyField: result.rows[0],
        });
    } catch (error) {
        console.error('Błąd podczas dodawania kierunku:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
}

// method used for updating field of study in database

exports.editStudyField = async (req, res, next) => {

    const studyField = {
        id_kierunku: req.query.id_kierunku,
        nazwa: req.body.nazwa,
        wydzial: req.body.wydzial,
        x: +req.body.x,
        y: +req.body.y
    };

    const query = `UPDATE kierunek SET nazwa = $1, wydzial = $2, x = $3, y = $4 WHERE id_kierunku = $5`
    const values = [studyField.nazwa, studyField.wydzial, studyField.x, studyField.y, studyField.id_kierunku];

    try {
        const result = await db.query(query, values);

        res.status(201).json({
            message: 'Kierunek edytowany pomyślnie!',
            studyField: result.rows[0],
        });
    } catch (error) {
        console.error('Błąd podczas edytowania kierunku:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
}

// method used for deleting study field from database

exports.deleteStudyField = async (req, res, next) => {
    const studyFieldID = req.query.id_kierunku

    const query = `DELETE FROM kierunek WHERE id_kierunku = $1`;
    const values = [studyFieldID]

    try {
        const result = await db.query(query, values);

        res.status(201).json({
            message: 'Kierunek usunięty pomyślnie!',
            studyField: result.rows[0],
        });
    } catch (error) {
        console.error('Błąd podczas usuwania kierunku:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
} 