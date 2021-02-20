const jwt = require("jsonwebtoken");
const config = require("./AuthConfig");

getToken = (req, res, next) => {
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    } else if (token != config.clientKey) {
        return res.status(401).send({
            message: "Unauthorized!"
        });
    }
    let accessToken = jwt.sign({ key: config.key }, config.secret, {
        expiresIn: 86400 // 24 hours
    });
    // console.log("config.key", config.key)
    // console.log("config.secret", config.secret)
    res.send({
        accessToken: accessToken
    });
}

verifyToken = (req, res, next) => {
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    } else if (token != config.clientKey) {
        return res.status(401).send({
            message: "Unauthorized!"
        });
    }

    let accessToken = jwt.sign({ key: token }, config.secret, {
        expiresIn: 86400 // 24 hours
    });

    jwt.verify(accessToken, config.secret, (err, user) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        // console.log("user", user)
        req.user = user;
        next();
    });
};

verifyAuth = (req, res, next) => {
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    
    jwt.verify(token, config.secret, (err, user) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        // console.log("user", user)
        req.user = user;
        next();
    });
};

module.exports = {
    verifyToken: verifyToken,
    verifyAuth: verifyAuth,
    getToken: getToken,
};
