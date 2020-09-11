const jwt = require('jsonwebtoken');
var config =require('../backend/config/config')
var env_config = config.get_active_config();

// MIDDLEWERE FUNCTION TO CHECK THE TOKEN
module.exports = function(req, res, next) {
    const token = req.headers.token;
    // console.log(token);
    if (!token) return res.status(401).send("Access Denied")
    try {
        const verified = jwt.verify(token, env_config.jwt_secret);
        req.user = verified;
        // console.log(req.user);
        next();
    } catch (error) {
        return res.status(400).send('Invlid Token');
    }
}