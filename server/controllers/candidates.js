////////////////////////////////////////////
// CONTROLLER HANDLES HTTP REQUESTS       //
// REFERS TO CANDIDATES WHO FINISHED TEST //
////////////////////////////////////////////

// import database

const db = require('../db')

// method adds new candidate to database

exports.createCandidate = async (req, res, next) => {

    const candidate = {
        imie: req.body.imie,
        nazwisko: req.body.nazwisko,
        email: req.body.email,
        miasto: req.body.miasto
    }


    const query = `INSERT INTO kandydat (imie, nazwisko, email, miasto) VALUES ($1, $2, $3, $4) RETURNING id_kandydata`;
    const values = [candidate.imie, candidate.nazwisko, candidate.email, candidate.miasto];

    try {

        const result = await db.query(query, values);
        res.status(201).json({
            message: 'Kandydat poprawnie dodany!',
            id_kandydata: result.rows[0].id_kandydata
        })

    } catch (error) {

        console.error('Błąd podczas dodawania kandydata:', error);
        res.status(500).json({ error: 'Błąd serwera' });

    }

}

// method returns all candidates from database and
// fields of study assigned to each of them

exports.getCandidates = async (req, res, next) => {

    const query = `SELECT k.imie, k.nazwisko, k.email, k.miasto, to_char(w.data, 'YYYY-MM-DD') AS data, ki.nazwa, k.id_kandydata 
    FROM kandydat AS k
    JOIN wynik_testu AS w
    ON k.id_kandydata = w.id_kandydata
    JOIN kierunek as ki
    ON w.id_kierunku = ki.id_kierunku`;

    const result = await db.query(query);

    if (result) {
        res.status(200).json({
            candidates: result.rows,
            message: 'Kandydaci znalezieni!'
        }) 
    } else {
        res.status(404).json({
            message: 'Nie znaleziono kandydatów!'
        })
    }
}

// method deletes candidate from database

exports.deleteCandidate = async (req, res, next) => {

    const candidateID = req.query.id_kandydata;

    const transaction = await db.connect()

    // transaction is used because before candidate remove
    // it is needed to remove his test result from database

    try {

        await transaction.query('BEGIN');

        const deleteResultQuery = `DELETE FROM wynik_testu WHERE id_kandydata = $1`;
        const resultValues = [candidateID];

        await transaction.query(deleteResultQuery, resultValues);

        const deleteCandidateQuery = `DELETE FROM kandydat WHERE id_kandydata = $1`;
        const candidateValues = [candidateID];

        const candidateResult = await transaction.query(deleteCandidateQuery, candidateValues);

        await transaction.query(`COMMIT`);

        res.status(201).json({
            message: 'Kandydat usunięty pomyślnie!',
            candidate: candidateResult.rows[0]
        });

    } catch (error) {
        await transaction.query(`ROLLBACK`);
        console.error('Błąd podczas usuwania kandydata:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    } finally {
        transaction.release();
    }

}