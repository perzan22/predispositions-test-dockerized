const db = require('../db')


exports.getAnswers = async (req, res, next) => {
    const id_pytania = req.query.id_pytania

    const query = `SELECT o.id_odpowiedzi, o.tresc, o.wartosc_punktowa, t.label 
    FROM odpowiedz AS o 
    JOIN pytanie AS p 
    ON p.id_pytania = o.id_pytania 
    JOIN typ_pytania AS t 
    ON t.id_typu = p.id_typu 
    WHERE o.id_pytania = $1 
    ORDER BY o.id_odpowiedzi`;

    const values = [id_pytania]
    const result = await db.query(query, values);
    if (result) {
        res.status(200).json({
            answers: result.rows,
            message: 'Odpowiedzi znalezione!'
        })
    } else {
        res.status(404).json({ message: 'Nie znaleziono odpowiedzi' })
    }
}

// Funckja zwraca wszystkie odpowiedzi
exports.getAllAnswers = async (req, res, next) => {
    // Wykonanie polecenia SQL zwracającego wszystkie wiersze encji odpowiedz
    const query = `SELECT * FROM odpowiedz`;
    const result = await db.query(query);

    if (result) {
        // Jeśli polecenie się powiodło to zwracane są odpowiedzi
        res.status(200).json({
            answers: result.rows,
            message: 'Odpowiedzi znalezione!'
        })
    } else {
        // Jeśli polecenie się nie powiodło to zwracana jest informacja o błędzie
        res.status(404).json({ message: 'Nie znaleziono odpowiedzi' })
    }
}

exports.editAnswer = async (req, res, next) => {
    const answer = {
        id_odpowiedzi: req.query.id_odpowiedzi,
        tresc: req.body.tresc,
        wartosc_punktowa: req.body.wartosc_punktowa,
        id_pytania: +req.body.id_pytania
    };



    const query = `UPDATE odpowiedz SET tresc = $1, wartosc_punktowa = $2, id_pytania = $3 WHERE id_odpowiedzi = $4`
    const values = [answer.tresc, answer.wartosc_punktowa, answer.id_pytania, answer.id_odpowiedzi];

    try {
        const result = await db.query(query, values);
        res.status(201).json({
            message: 'Odpowiedz edytowana pomyślnie!'
        });
    } catch (error) {
        console.error('Błąd podczas edytowania odpowiedzi:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
}

exports.addNewAnswer = async (req, res, next) => {
    const answer = {
        tresc: req.body.tresc,
        id_pytania: req.body.id_pytania,
        wartosc_punktowa: +req.body.wartosc_punktowa
    };

    const transaction = await db.connect()

    try {

        await transaction.query('BEGIN');
        const addAnswerQuery = `INSERT INTO odpowiedz (tresc, id_pytania, wartosc_punktowa) VALUES ($1, $2, $3)`;
        const answerValues = [answer.tresc, answer.id_pytania, answer.wartosc_punktowa];

        const answerResult = await transaction.query(addAnswerQuery, answerValues);

        const updateQuestionQuery = `UPDATE pytanie SET ilosc_odpowiedzi = ilosc_odpowiedzi + 1 WHERE id_pytania = $1`;
        const questionValues = [answer.id_pytania];

        await transaction.query(updateQuestionQuery, questionValues);

        await transaction.query(`COMMIT`);

        res.status(201).json({
            message: 'Odpowiedź dodana pomyślnie!',
            answer: answerResult.rows[0]
        });

    } catch (error) {
        await transaction.query(`ROLLBACK`);
        console.error('Błąd podczas dodawania odpowiedzi:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    } finally {
        transaction.release();
    }

}

// Funkcja DELETE usuwająca odpowiedź z bazy danych za pomocą transakcji
exports.deleteAnswer = async (req, res, next) => {
    // Dane identyfikujące odpowiedź przekazane za pomocą parametrów zapytania
    const answerID = req.query.id_odpowiedzi
    const questionID = req.query.id_pytania

    // Rozpoczęcie połączenia z bazą danych
    const transaction = await db.connect()

    // Konstrukcja obsługująca błędy
    try {

        // Rozpoczęcie transakcji
        await transaction.query('BEGIN');

        // Usunięcie odpowiedzi z bazy danych o podanym id
        const deleteAnswerQuery = `DELETE FROM odpowiedz WHERE id_odpowiedzi = $1`;
        const answerValues = [answerID];

        // Wykonanie polecenia usunięcia odpowiedzi
        const answerResult = await transaction.query(deleteAnswerQuery, answerValues);

        // Edytowanie ilości odpowiedzi dla rekordu w tabeli pytanie o podanym id
        const updateQuestionQuery = `UPDATE pytanie SET ilosc_odpowiedzi = ilosc_odpowiedzi - 1 WHERE id_pytania = $1`;
        const questionValues = [questionID];

        // Wykonanie polecenia edytowania pytania
        await transaction.query(updateQuestionQuery, questionValues);

        // Zatwierdzenie transakcji
        await transaction.query(`COMMIT`);

        // Zwrócenie usuniętej odpowiedzi w przypadku powodzenia
        res.status(201).json({
            message: 'Odpowiedź usunięta pomyślnie!',
            answer: answerResult.rows[0]
        });

    
    } catch (error) {
        // W przypadku błedu cofane są wszystkie operacje w transakcji
        await transaction.query(`ROLLBACK`);
        // Zwraca inforkmacje o błedzie
        console.error('Błąd podczas usuwania odpowiedzi:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    } finally {
        // Zwolnienie połączenia transaction
        transaction.release();
    }
}