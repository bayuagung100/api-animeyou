var response = require('./res');
var koneksi = require('./config');
var express = require('express');


//form-data
var formidable = require('formidable');
var mv = require('mv');
//end form-data

const Jikan = require('jikan-node');
const mal = new Jikan();


var request = require('request');

const axios = require('axios');
const cheerio = require('cheerio');
const { text } = require('body-parser');


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

// exports.anime = function (req, res) {
//     mal.findAnime('11597', 'episodes', 1)
//     .then(info => console.log(info))
//     .catch(err => console.log(err));

// }

// exports.animesearch = function (req, res) {
//     var query = req.params.q;
//     console.log(query);
//     mal.search('anime', query)
//     .then(info => response.ok(info, res))
//     .catch(err => console.log(err));
// }

exports.widgetHeader = function (req, res) {
    axios('https://myanimelist.net/')
        .then(info => {
            const html = info.data;
            const $ = cheerio.load(html)

            const urlElems = $('.widget-slide-outer')
            // console.log(urlElems.length);
            
            const urlElemsTitle = $(urlElems[0]).find('li.btn-anime');
            // console.log(urlElemsTitle.length);

            const topPremierLeagueScorers = [];

            urlElemsTitle.each(function () {
                const title = $(this).find('span.title').text();
                const href = $(this).find('a').attr('href');
                const img = $(this).find('img').attr('data-src');
                const idMal = href.split("/")[4];
                topPremierLeagueScorers.push({
                    idMal,
                    href,
                    title,
                    img,
                });
            });
            response.agc(topPremierLeagueScorers,res, "widget-header");
        })
        .catch(console.error);
    
}

exports.animeSearch = function (req, res) {
    var q = req.params.q;
    var show = req.params.show;
    
    if (show) {
        var url = 'https://myanimelist.net/anime.php?q='+q+'&show='+show;
        console.log(url);
    } else {
        var url = 'https://myanimelist.net/anime.php?q='+q;
        console.log(url);
    }
    
    axios(url)
        .then(info => {
            const html = info.data;
            const $ = cheerio.load(html)

            const urlElems = $('tbody');
            console.log(urlElems.length);
            
            const urlElemsArray = $(urlElems[2]).find('tr');
            console.log(urlElemsArray.length);

            const urlElemsPages = $('div').find('.spaceit a');
            console.log(urlElemsPages.length);

            const pageElemsArrays = [];

            urlElemsPages.each(function () {
                const showElems = $(this).attr('href');
                const page = $(this).text();
                const show = showElems.split("show=")[1];
                if (show != undefined) {
                    pageElemsArrays.push({
                        show,
                        page
                    })
                }
                
            })

            const urlElemsArrays = [];

            // urlElemsArray.each(function () {
            for (let i = 1; i < urlElemsArray.length; i++) {

                const href = $(urlElemsArray[i]).find('.picSurround a.hoverinfo_trigger').attr('href');
                const title = $(urlElemsArray[i]).find('a.fw-b').text();
                const img = $(urlElemsArray[i]).find('.picSurround img').attr('data-src');
                const idMal = href.split("/")[4];
                const desc = $(urlElemsArray[i]).find('.pt4').text().split("...")[0];
                const type = $(urlElemsArray[i]).find($('[width=45]')).text();
                const episode = $(urlElemsArray[i]).find($('[width=40]')).text();
                const score = $(urlElemsArray[i]).find($('[width=50]')).text();
                urlElemsArrays.push({
                    idMal,
                    href,
                    title,
                    img,
                    desc,
                    type,
                    episode,
                    score,
                });
            }
            // });
            response.agcSearch(urlElemsArrays,res, "search-results", pageElemsArrays);
        })
        .catch(console.error);
    
}

function printHtml(req, res, html) {
	res.send('<textarea cols="100%" rows="50%">'+ html + '</textarea>');
}

function filtered(array) { 
    array.filter(function (el) {
        return el != null;
    });
 } 


// end api v1


