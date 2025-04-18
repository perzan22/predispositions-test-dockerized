//////////////////////////////////////////
// MIDDLEWARE TO CHECK IF HTTP REQUEST  //
// HAS PROPER AUTHORIZATION TOKEN       //
//////////////////////////////////////////

// imports

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {

        // token is returned from request headers

        const token = req.headers.authorization.split('Bearer ')[1];

        // verify the token

        const decodedToken = jwt.verify(token, process.env.TOKEN);
        req.userData = { login: decodedToken.login };

        // if token is correct then go to next middleware

        next();
    } catch (error) {
        
        // if token is not correct then request isnt handled

        res.status(403).json({ message: `${error.name}, zaloguj się ponownie!` });
    }
}