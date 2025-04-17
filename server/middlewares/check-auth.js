const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware weryfikuje poprawność tokena JWT
module.exports = (req, res, next) => {
    try {
        // Token uzyskuje się przez nagłówek żądania HTTP
        const token = req.headers.authorization.split('Bearer ')[1];

        // Weryfikacja tokena
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        req.userData = { login: decodedToken.login };

        // Przejście do kolejnego middleware lub funkcji kontrolera
        next();
    } catch (error) {
        // Jeśli błąd to nie pozwala przejść do funkcji kontrolera
        res.status(403).json({ message: `${error.name}, zaloguj się ponownie!` });
    }
}