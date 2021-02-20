const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const crypto = require('crypto').randomBytes(64).toString('hex');
const clientKey = "WWHXV$)~E+2u^Jt,~(kh>VcCcuJ!oT";
module.exports = {
    key: crypto,
    secret: bcrypt.hashSync(crypto, salt),
    clientKey: Buffer.from(clientKey).toString('base64'),
};
