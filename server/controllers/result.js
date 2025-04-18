//////////////////////////////////////
// CONTROLLER HANDLES HTTP REQUESTS //
//      REFERS TO TEST RESULTS      //
//////////////////////////////////////

// import database

const db = require('../db')

// import functions for calculating the result

const findClosestField = require('../functions/findClosestField')
const calculatePersonality = require('../functions/calculatePersonality')

// method calaculates test result based on candidate answers

exports.getTestResult = async (req, res, next) => {

    const answers = req.body.candidateAnswers;
    console.log(answers)

    // get all possible types of personality and its represantation
    // on hexagonal model. Types are used to assign
    // field of study to candidate

    const hexagonQuery = `SELECT x, y, label FROM typ_osobowosci`;
    const hexagon = await db.query(hexagonQuery);

    // calculate candidate personality type

    const personalityPoint = calculatePersonality(answers, hexagon.rows);

    const studyQuery = `SELECT * FROM kierunek`;
    const result = await db.query(studyQuery);
    const kierunki = result.rows;

    // assign field of study based on candidate personality type
    
    const kierunek = findClosestField(personalityPoint, kierunki)

    res.status(200).json({ 
        kierunek: kierunek,
        wynik: personalityPoint.x
    })
}

// method used for adding test result to database

exports.addNewResult = async (req, res, next) => {

    const testResult = {
        data: new Date(),
        id_kandydata: req.body.id_kandydata,
        id_kierunku: req.body.id_kierunku,
        wynik: req.body.wynik
    }

    const query = `INSERT INTO wynik_testu (data, id_kandydata, id_kierunku, wynik) VALUES ($1, $2, $3, $4)`;
    const values = [testResult.data, testResult.id_kandydata, testResult.id_kierunku, testResult.wynik];

    try {

        const result = await db.query(query, values);
        res.status(201).json({
            message: 'Twój wynik dostępny jest na mailu!',
            wynik_testu: result.rows[0]
        })

    } catch (error) {

        console.error('Błąd podczas dodawania wyniku:', error);
        res.status(500).json({ error: 'Błąd serwera' });

    }

}

