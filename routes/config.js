var mysqli = require('mysql');

//local
var conn = mysqli.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api-animeyou'
});

//rumahweb
// var conn = mysqli.createConnection({
//     host: '103.247.9.85',
//     user: 'quif4942_bayu',
//     password: 'bayuagung123',
//     database: 'quif4942_api-animeyou'
// });

//hostinger
// var conn = mysqli.createConnection({
//     host: 'sql261.main-hosting.eu',
//     user: 'u328098603_bayu',
//     password: 'Bayuagung@123',
//     database: 'u328098603_api_animeyou'
// });

conn.connect(function (err) {
    if(err) throw err;
});

conn.on('error', function(err) {
    console.log(err.code);
});

// var sqlConnection = function sqlConnection(sql, values, next) {

//     // It means that the values hasnt been passed
//     if (arguments.length === 2) {
//         next = values;
//         values = null;
//     }

//     var connection = conn;
//     connection.connect(function(err) {
//         if (err !== null) {
//             console.log("[MYSQL] Error connecting to mysql:" + err.code+'\n');
//         }
//     });

//     connection.query(sql, values, function(err) {

//         connection.end(); // close the connection

//         if (err) {
//             throw err;
//         }

//         // Execute the callback
//         next.apply(this, arguments);

//     });
// }

module.exports = conn;
