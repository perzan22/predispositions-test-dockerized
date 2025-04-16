const db = require('../db')

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

// Funkcja PATCH zmieniająca 
exports.editStudyField = async (req, res, next) => {

    // Przekazanie danych w ciele i parametrach żądania
    const studyField = {
        id_kierunku: req.query.id_kierunku,
        nazwa: req.body.nazwa,
        wydzial: req.body.wydzial,
        x: +req.body.x,
        y: +req.body.y
    };

    // Polecenie UPDATE edytuje kierunek o podanym id_kierunku
    const query = `UPDATE kierunek SET nazwa = $1, wydzial = $2, x = $3, y = $4 WHERE id_kierunku = $5`
    const values = [studyField.nazwa, studyField.wydzial, studyField.x, studyField.y, studyField.id_kierunku];

    // Konmstrukcja do obsługi błedów
    try {
        // Wykonanie polecenia
        const result = await db.query(query, values);

        // Powodzenie polecenia zwraca edytowany kierunek i informacje
        res.status(201).json({
            message: 'Kierunek edytowany pomyślnie!',
            studyField: result.rows[0],
        });
    } catch (error) {
        // W przypadku błedu zwracana informacja o błędzie
        console.error('Błąd podczas edytowania kierunku:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
}

// Funkcja DELETE usuwająca kierunek studiów z bazy danych
exports.deleteStudyField = async (req, res, next) => {
    // id kierunku otrzymuje się z parametru zapytania
    const studyFieldID = req.query.id_kierunku

    // Usuniecie kierunku za pomocą polecenia DELETE SQL
    const query = `DELETE FROM kierunek WHERE id_kierunku = $1`;
    const values = [studyFieldID]

    // Konstrukcja do obsługi błedów
    try {
        // Wykonanie polecenia
        const result = await db.query(query, values);

        // Powodzenie zapytania zwraca usunięty kierunek i informacje
        res.status(201).json({
            message: 'Kierunek usunięty pomyślnie!',
            studyField: result.rows[0],
        });
    } catch (error) {
        // W przypadku błedu zwracana jest informacja o błędzie
        console.error('Błąd podczas usuwania kierunku:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
} 