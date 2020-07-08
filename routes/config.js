var mysqli = require('mysql');

//local
// var conn = mysqli.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'api-animeyou'
// });

//rumahweb
var conn = mysqli.createConnection({
    host: '103.247.9.85',
    user: 'quif4942_bayu',
    password: 'bayuagung123',
    database: 'quif4942_api-animeyou'
});

conn.connect(function (err) {
    if(err) throw err;
});

module.exports = conn;
