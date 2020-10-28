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

exports.translateGoogle = function (req, res) {
    var translated = req.body.translate;
    const translate = require('@k3rn31p4nic/google-translate-api');
    translate(translated, { to: 'id' }).then(trans => {
        response.ok(trans.text, res)
        // console.log(trans.text); // OUTPUT: You are amazing!
      }).catch(err => {
        console.error(err);
      });
      
}

//jikan

exports.jikanFindAnime = function(req, res) {
    var id = req.params.id;
    var request = req.params.request;
    var page = req.params.page;
    mal.findAnime(id, request, page)
    .then(info => response.ok(info,res))
    .catch(err => console.log(err));
}
//end jikan

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
                response.auth(pass, rows, res);
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

function escapeSansQuotes(connection, criterion) {
    return connection.escape(criterion).match(/^'(\w+)'$/)[1];
}


exports.dtanimelist = function (req, res) {
    // console.log(req.body)
    var draw = req.body.draw;
    var order = req.body.order[0].dir;
    var start = parseInt(req.body.start);
    var end = parseInt(req.body.length);
    var search = req.body.search.value;
    if (search == '') {
        var query = "SELECT * FROM anime ORDER BY id "+escapeSansQuotes(koneksi, order)+" LIMIT "+start+","+end;
    } else {
        var query = "SELECT * FROM anime WHERE title like '%"+search+"%' ORDER BY id "+escapeSansQuotes(koneksi, order)+" LIMIT "+start+","+end;
    }
    // console.log(query)
    // console.log(search)
    koneksi.query(query,  function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            koneksi.query("SELECT * FROM anime ",  function (error2, rows2, fields2) {
                if (error) {
                    console.log(error);
                } else {
                    var recordsTotal = rows2.length;
                    var Obj = [];
                    // var no = 1;
                    rows.forEach(function (element, index) { 
                        var id = element.id;
                        var title = element.title;
                        const hari = element.published_time.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); // hari, tanggal(angka) bulan(text) tahun(angka)
                        const menit = element.published_time.toLocaleTimeString(); // 00:00:00 AM/PM
                        var published_time = hari + ' at ' + menit

                        Obj.push([
                            // no=no,
                            title=title,
                            published_time=published_time,
                            id=id,
                        ])
                        // no++;
                    }); 
                    response.datatables(draw, recordsTotal, recordsTotal, Obj, res);
                }
            })
            
        }

    });
};

exports.addanimelist = function (req, res) {
    var form = new formidable.IncomingForm();
    // console.log(form);
    // manangani upload file
    form.parse(req, function (err, fields, files) {
        var idMal = fields.idMal;
        var url = fields.url;
        var images_name = files.images.name;
        var images_path = files.images.path;
        var images_newpath = "./public/images/" + images_name.replace(/\s+/g, '-').toLowerCase();
        var images_url = "images/" + images_name.replace(/\s+/g, '-').toLowerCase();
        var title = fields.title;
        var title_english = fields.title_english==="" ? null:fields.title_english;
        var title_synonyms = fields.title_synonyms==="" ? null:fields.title_synonyms;
        var title_japanese = fields.title_japanese==="" ? null:fields.title_japanese;
        var types = fields.types;
        var episodes = fields.episodes;
        var status = fields.status;
        var aired = fields.aired;
        var premiered = fields.premiered;
        var arr_premiered = premiered.split(' ');
        var season = arr_premiered[0];
        var year = arr_premiered[1];
        var broadcast = fields.broadcast;
        var producers = fields.producers;
        var arr_producers = producers.split(',');
        var licensors = fields.licensors;
        var arr_licensors = licensors.split(',');
        var studios = fields.studios;
        var arr_studios = studios.split(',');
        var source = fields.source;
        var genres = fields.genres;
        var arr_genres = genres.split(',');
        var duration = fields.duration;
        var rating = fields.rating;
        var score = fields.score;
        var synopsis = fields.synopsis;
        var views = fields.views;
        var published_time = fields.published_time;
        var modified_time = fields.modified_time;

        // console.log(arr_producers[0])
        
        //insert seasons jika belum ada data di database
        koneksi.query("SELECT * FROM seasons WHERE season=? AND year=?", [season, year], function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                var numRows = rows.length;
                if (numRows===0) {
                    koneksi.query("INSERT INTO seasons (season, year) VALUES (?,?)", [season, year], function (error, rows, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            }
        });

        //insert producers, licensors, studios, genres jika belum ada data di database
        if (producers != "") {
            arr_producers.forEach(value => {
                koneksi.query("SELECT * FROM producers WHERE producer=?", [value], function (error, rows, fields) {
                    if (error) {
                        console.log(error);
                    } else {
                        var numRows = rows.length;
                        if (numRows===0) {
                            koneksi.query("INSERT INTO producers (producer) VALUES (?)", [value], function (error, rows, fields) {
                                if (error) {
                                    console.log(error);
                                }
                            });
                        }
                    }
                });
            });
        } else {
            producers = null
        }

        if (licensors != "") {
            arr_licensors.forEach(value => {
                koneksi.query("SELECT * FROM producers WHERE producer=?", [value], function (error, rows, fields) {
                    if (error) {
                        console.log(error);
                    } else {
                        var numRows = rows.length;
                        if (numRows===0) {
                            koneksi.query("INSERT INTO producers (producer) VALUES (?)", [value], function (error, rows, fields) {
                                if (error) {
                                    console.log(error);
                                }
                            });
                        }
                    }
                });
            });
        } else {
            licensors = null
        }
        
        if (studios != "") {
            arr_studios.forEach(value => {
                koneksi.query("SELECT * FROM producers WHERE producer=?", [value], function (error, rows, fields) {
                    if (error) {
                        console.log(error);
                    } else {
                        var numRows = rows.length;
                        if (numRows===0) {
                            koneksi.query("INSERT INTO producers (producer) VALUES (?)", [value], function (error, rows, fields) {
                                if (error) {
                                    console.log(error);
                                }
                            });
                        }
                    }
                });
            });
        } else {
            studios = null
        }
        
        arr_genres.forEach(value => {
            koneksi.query("SELECT * FROM genres WHERE genre=?", [value], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    var numRows = rows.length;
                    if (numRows===0) {
                        koneksi.query("INSERT INTO genres (genre) VALUES (?)", [value], function (error, rows, fields) {
                            if (error) {
                                console.log(error);
                            }
                        });
                    }
                }
            });
        });

        koneksi.query("SELECT * FROM anime WHERE idMal=? OR title=?", [idMal, title], function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                var numRows = rows.length
                if (numRows===0) {
                    mv(images_path, images_newpath, function (err) {
                        if (err) { 
                            console.log(err); 
                        } else {
                            koneksi.query("INSERT INTO anime (idMal,url,images,images_url,title,title_english,title_synonyms,title_japanese,types,episodes,status,aired,premiered,broadcast,producers,licensors,studios,source,genres,duration,rating,score,synopsis,views,published_time,modified_time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [idMal,url,images_name,images_url,title,title_english,title_synonyms,title_japanese,types,episodes,status,aired,premiered,broadcast,producers,licensors,studios,source,genres,duration,rating,score,synopsis,views,published_time,modified_time], function (error, rows, fields) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    response.addAnime('Success Tambah Anime', res);
                                }
                            });
                        }
                    })
                } else {
                    //status 406 = not acceptable
                    response.addAnime('Judul Anime Sudah Ada', res, 406);
                }
            }
        })
    })
}
exports.animelistbyid = function (req, res) {
    var id = req.params.id;
    koneksi.query("SELECT * FROM anime WHERE id=?", [id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }
    });
};
exports.deleteanimelist = function (req, res) {
    var id = req.params.id;
    koneksi.query("DELETE FROM anime WHERE id=?", [id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil delete", res);
        }
    });
};

exports.dtgenrelist = function (req, res) {
    // console.log(req.body)
    var draw = req.body.draw;
    var order = req.body.order[0].dir;
    var start = parseInt(req.body.start);
    var end = parseInt(req.body.length);
    var search = req.body.search.value;
    if (search == '') {
        var query = "SELECT * FROM genres ORDER BY id "+escapeSansQuotes(koneksi, order)+" LIMIT "+start+","+end;
    } else {
        var query = "SELECT * FROM genres WHERE genre like '%"+search+"%' ORDER BY id "+escapeSansQuotes(koneksi, order)+" LIMIT "+start+","+end;
    }
    // console.log(query)
    // console.log(search)
    koneksi.query(query,  function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            koneksi.query("SELECT * FROM genres ",  function (error2, rows2, fields2) {
                if (error) {
                    console.log(error);
                } else {
                    var recordsTotal = rows2.length;
                    var Obj = [];
                    // var no = 1;
                    rows.forEach(function (element, index) { 
                        var id = element.id
                        var genre = element.genre
                        Obj.push([
                            // no=no,
                            genre=genre,
                            id=id,
                        ])
                        // no++;
                    }); 
                    response.datatables(draw, recordsTotal, recordsTotal, Obj, res);
                }
            })
            
        }

    });
};

exports.addgenrelist = function (req, res) {
    var genre = req.body.genre;

    koneksi.query("INSERT INTO genres (genre) VALUES (?)", [genre], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }
    });
};

exports.genrelistbyid = function (req, res) {
    var id = req.params.id;
    koneksi.query("SELECT * FROM genres WHERE id=?", [id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }
    });
};

exports.updategenrelist = function (req, res) {
    var id = req.body.id;
    var genre = req.body.genre;

    koneksi.query("UPDATE genres SET genre=? WHERE id=?", [genre, id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil update", res);
        }
    });
};

exports.deletegenrelist = function (req, res) {
    var id = req.params.id;
    koneksi.query("DELETE FROM genres WHERE id=?", [id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil delete", res);
        }
    });
};


exports.dtproducerlist = function (req, res) {
    // console.log(req.body)
    var draw = req.body.draw;
    var order = req.body.order[0].dir;
    var start = parseInt(req.body.start);
    var end = parseInt(req.body.length);
    var search = req.body.search.value;
    if (search == '') {
        var query = "SELECT * FROM producers ORDER BY id "+escapeSansQuotes(koneksi, order)+" LIMIT "+start+","+end;
    } else {
        var query = "SELECT * FROM producers WHERE producer like '%"+search+"%' ORDER BY id "+escapeSansQuotes(koneksi, order)+" LIMIT "+start+","+end;
    }
    
    koneksi.query(query, function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            koneksi.query("SELECT * FROM producers ",  function (error2, rows2, fields2) {
                if (error) {
                    console.log(error);
                } else {
                    var recordsTotal = rows2.length;
                    var Obj = [];
                    // var no = 1;
                    rows.forEach(function (element, index) { 
                        var id = element.id
                        var producer = element.producer
                        Obj.push([
                            // no=no,
                            producer=producer,
                            id=id,
                        ])
                        // no++;
                    }); 
                    response.datatables(draw, recordsTotal, recordsTotal, Obj, res);
                }
            })
        }

    });
};

exports.addproducerlist = function (req, res) {
    var producer = req.body.producer;

    koneksi.query("INSERT INTO producers (producer) VALUES (?)", [producer], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }
    });
};

exports.producerlistbyid = function (req, res) {
    var id = req.params.id;
    koneksi.query("SELECT * FROM producers WHERE id=?", [id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }
    });
};

exports.updateproducerlist = function (req, res) {
    var id = req.body.id;
    var producer = req.body.producer;

    koneksi.query("UPDATE producers SET producer=? WHERE id=?", [producer, id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil update", res);
        }
    });
};

exports.deleteproducerlist = function (req, res) {
    var id = req.params.id;
    koneksi.query("DELETE FROM producers WHERE id=?", [id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil delete", res);
        }
    });
};

// end api v1


