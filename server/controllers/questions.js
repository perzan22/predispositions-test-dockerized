//////////////////////////////////////
// CONTROLLER HANDLES HTTP REQUESTS //
// REFERS TO SENDING TEST QUESTIONS //
//////////////////////////////////////

// import database

const db = require('../db')

// method returns all questions from database

exports.getQuestions = async (req, res, next) => {
    const query = `SELECT * FROM pytanie ORDER BY id_pytania`;
    const result = await db.query(query);
    if (result) {
        res.status(200).json({
            questions: result.rows,
            message: 'Pytania znalezione!'
        })
    } else {
        res.status(404).json({ message: 'Nie znaleziono pytań' })
    }
}

// method returns specific question based on id

exports.getQuestion = async (req, res, next) => {
    const id_pytania = req.query.id_pytania
    const query = `SELECT * FROM pytanie WHERE id_pytania = $1`
    const values = [id_pytania]
    const question = (await db.query(query, values)).rows[0];
    if (question) {
        res.status(200).json({
            id_pytania: question.id_pytania,
            tresc: question.tresc,
            instrukcja: question.instrukcja,
            ilosc_odpowiedzi: question.ilosc_odpowiedzi,
            id_typu: question.id_typu
        })
    } else {
        res.status(404).json({ message: 'Nie znaleziono pytania' })
    }
}

// method used for updating question in database

exports.editQuestion = async (req, res, next) => {
    const question = {
        id_pytania: req.query.id_pytania,
        tresc: req.body.tresc,
        instrukcja: req.body.instrukcja,
        ilosc_odpowiedzi: +req.body.ilosc_odpowiedzi,
        id_typu: +req.body.id_typu
    };

    const query = `UPDATE pytanie SET tresc = $1, instrukcja = $2, ilosc_odpowiedzi = $3, id_typu = $4 WHERE id_pytania = $5`
    const values = [question.tresc, question.instrukcja, question.ilosc_odpowiedzi, question.id_typu, question.id_pytania];

    try {
        const result = await db.query(query, values);
        res.status(201).json({
            message: 'Pytanie edytowane pomyślnie!',
            question: result.rows[0],
        });
    } catch (error) {
        console.error('Błąd podczas edytowania pytania:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
}

// method adds new question to database

exports.addQuestion = async (req, res, next) => {

    const { tresc, instrukcja, typ_pytania } = req.body;

    const query = `INSERT INTO pytanie (tresc, instrukcja, id_typu, ilosc_odpowiedzi) VALUES ($1, $2, $3, $4) RETURNING id_pytania`
    const values = [tresc, instrukcja, typ_pytania, 0]

    try {
        const result = await db.query(query, values);
        res.status(201).json({
            id_pytania: result.rows[0].id_pytania
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Błąd podczas dodawania pytania.' });
    }
}

// method deletes question from database

exports.deleteQuestion = async (req, res, next) => {

    const questionID = req.query.id_pytania

    const transaction = await db.connect()

    // transaction is used because before deleteing question
    // it is needed to delete all answers connected to this question

    try {

        await transaction.query(`BEGIN`);

        const answerQuery = `DELETE FROM odpowiedz WHERE id_pytania = $1`;
        const values = [questionID]

        await transaction.query(answerQuery, values);

        const questionQuery = `DELETE FROM pytanie WHERE id_pytania = $1`;
        
        const questionResult = await transaction.query(questionQuery, values);

        await transaction.query(`COMMIT`)

        res.status(201).json({
            message: 'Pytanie usunięte pomyślnie!',
            question: questionResult.rows[0]
        })

    } catch (error) {

        await transaction.query(`ROLLBACK`);
        console.error('Błąd podczas usuwania pytania:', error);
        res.status(500).json({ error: 'Błąd serwera' });

    } finally {

        transaction.release();

    }

}

// method returns all types of questions

exports.getQuestionTypes = async (req, res, next) => {
    const query = `SELECT * FROM typ_pytania`;
    const result = await db.query(query);
    if (result) {
        res.status(200).json({
            questionTypes: result.rows,
            message: 'Typy pytań znalezione!'
        })
    } else {
        res.status(404).json({ message: 'Nie znaleziono pytań' })
    }
}