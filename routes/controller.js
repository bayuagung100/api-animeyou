var response = require('./res');
var koneksi = require('./config');
var express = require('express');

//form-data
var formidable = require('formidable');
var mv = require('mv');
//end form-data


// api v1

/* GET home page. */
exports.index = function (req, res) {
    res.render('index', { title: 'Api Animeyou' });
};

exports.userbyid = function (req, res) {
    var id = req.params.id;

    koneksi.query("SELECT * FROM users WHERE id=?", [id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
            // console.log(req.params);
        }

    });
};

// pakai x-www-form-urlencoded
exports.auth = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    const crypto = require('crypto')
    let pass = crypto.createHash('md5').update(password).digest("hex");
    if (username && password) {
        koneksi.query('SELECT * FROM users WHERE username =? AND password =?', [username, pass], function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else if (rows.length > 0) {
                response.ok(rows, res);
            } else {
                response.ok("Incorrect Username and/or Password!", res, 202);
            }
        });
    } else {
        response.ok("Please insert Username and Password!", res, 204);
    }
};

//pakai form-data
exports.upload = function (req, res) {
    // membuat objek form dari formidable
    var form = new formidable.IncomingForm();

    // manangani upload file
    form.parse(req, function (err, fields, files) {
        var oldpath = files.gambar.path;
        var newpath = "./public/images/" + files.gambar.name.replace(/\s+/g, '-').toLowerCase();;
        var gambar = files.gambar.name;

        // pindahakan file yang telah di-upload
        mv(oldpath, newpath, function (err) {
            if (err) { 
                console.log(err); 
            } else {
                koneksi.query("INSERT INTO images (image) VALUES (?)", [gambar], function (error, rows, fields) {
                    if (error) {
                        console.log(error);
                    } else {
                        response.ok(rows, res);
                        // console.log(res);
                    }
                });
            }
        });
    });
};


//menggunakan x-www-form-urlencoded
// exports.createuser = function (req, res) {
//     var username = req.body.username;
//     var password = req.body.password;

//     koneksi.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], function (error, rows, fields) {
//         if (error) {
//             console.log(error);
//         } else {
//             response.ok(rows, res);
//             console.log(res);
//         }
//     });
// };

//menggunakan form-data
exports.createuser = function (req, res) {
    // membuat objek form dari formidable
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        var username = fields.username;
        var password = fields.password;

        koneksi.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
                // console.log(res);
            }
        });
    });
};

//menggunakan x-www-form-urlencoded
// exports.updateuser = function (req, res) {
//     var id = req.body.id;
//     var username = req.body.username;
//     var password = req.body.password;

//     koneksi.query("UPDATE users SET username=?, password=? WHERE id=?", [username, password, id], function (error, rows, fields) {
//         if (error) {
//             console.log(error);
//         } else {
//             response.ok("Berhasil merubah user", res);
//         }
//     });
// };

//menggunakan x-www-form-urlencoded
exports.updateuser = function (req, res) {
    // membuat objek form dari formidable
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        var id = fields.id;
        var username = fields.username;
        var password = fields.password;

        koneksi.query("UPDATE users SET username=?, password=? WHERE id=?", [username, password, id], function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil merubah user " + id, res);
                // console.log(res);
            }
        });
    });
};

//menggunakan x-www-form-urlencoded
// exports.deleteuser = function (req, res) {
//     var id = req.body.id;

//     koneksi.query("DELETE FROM users WHERE id=?", [id], function (error, rows, fields) {
//         if (error) {
//             console.log(error);
//         } else {
//             response.ok("Berhasil menghapus user", res);
//             console.log(res);
//         }
//     });
// };

//menggunakan form-data
exports.deleteuser = function (req, res) {
    // membuat objek form dari formidable
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        var id = fields.id;

        koneksi.query("DELETE FROM users WHERE id=?", [id], function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil menghapus user", res);
                console.log(res);
            }
        });
    });
};


exports.genres = function (req, res) {
    koneksi.query("SELECT * FROM genres ORDER BY genre ", function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
            // console.log(req.params);
        }

    });
};

exports.producers = function (req, res) {
    koneksi.query("SELECT * FROM producers ORDER BY producer ", function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
            // console.log(req.params);
        }

    });
};

exports.seasons = function (req, res) {
    koneksi.query("SELECT * FROM seasons ORDER BY year ", function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
            // console.log(req.params);
        }

    });
};

exports.types = function (req, res) {
    koneksi.query("SELECT * FROM types ORDER BY type ", function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
            // console.log(req.params);
        }

    });
};



// end api v1


