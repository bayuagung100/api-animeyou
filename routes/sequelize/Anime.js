const db = require("../../models");
const Table = require("../../models/seq_anime")(db.sequelize, db.Sequelize);
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../jwt/AuthConfig");
var response = require('../res');
var formidable = require('formidable');
var mv = require('mv');
const { sequelize } = require("../../models");
const Premiered = require("../../models/seq_season")(db.sequelize, db.Sequelize);
const Producer = require("../../models/seq_producer")(db.sequelize, db.Sequelize);
const Genre = require("../../models/seq_genre")(db.sequelize, db.Sequelize);


// Create and Save a new
exports.create = (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        // console.log("fields", fields)
        var idMal = fields.idMal;
        var url = fields.url;
        var images_name = files.images.name;
        var images_path = files.images.path;
        var images_newpath = "./public/images/" + images_name.replace(/\s+/g, '-').toLowerCase();
        var images_url = "images/" + images_name.replace(/\s+/g, '-').toLowerCase();
        var title = fields.title;
        var title_english = fields.title_english === "" ? null : fields.title_english;
        var title_synonyms = fields.title_synonyms === "" ? null : fields.title_synonyms;
        var title_japanese = fields.title_japanese === "" ? null : fields.title_japanese;
        var types = fields.types;
        var episodes = fields.episodes;
        var status = fields.status;
        var aired = fields.aired;
        var premiered = fields.premiered;
        var broadcast = fields.broadcast === "" ? null : fields.broadcast;
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

        let buff = new Buffer(url);
        let base64data = buff.toString('base64');
        // console.log('"' + data + '" converted to Base64 is "' + base64data + '"');

        var shortid = require('shortid');
        var randomid = shortid.generate();

        Table.findAll({
            where: {
                [Op.or]: [
                    { idMal: idMal },
                    { title: title }
                ]
            }
        }).then(data => {
            // console.log("data Anime", data);
            var numRows = data.length;
            if (numRows === 0) {
                mv(images_path, images_newpath, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        Table.findAll({
                            where: {
                                base64: randomid
                            }
                        }).then(async data => {
                            var cekRows = data.length;
                            if (cekRows > 0) {
                                randomid = shortid.generate();
                            }

                            // insert seasons jika belum ada data di database
                            if (premiered != "") {

                                var arr_premiered = premiered.split(' ');
                                var season = arr_premiered[0];
                                var year = arr_premiered[1];

                                let data = await Premiered.findAll({
                                    where: {
                                        season: season,
                                        year: year,
                                    },
                                })
                                if (!data) {
                                    return res.status(500).send({
                                        message:
                                            err.message
                                    });
                                } else {
                                    // console.log("data premiered", data.length)
                                    let numRows = data.length;
                                    if (numRows === 0) {
                                        await Premiered.create({
                                            season: season,
                                            year: year,
                                        })
                                    }
                                }
                            } else {
                                premiered = null;
                            }
                            // //insert producers, licensors, studios, genres jika belum ada data di database
                            if (producers != "") {
                                arr_producers.forEach(async (value, index, array) => {
                                    try {
                                        await Producer.findAll({
                                            where: {
                                                producer: value,
                                            },
                                        }).then(async data => {
                                            // console.log("data producers", data.length)
                                            let numRows = data.length;
                                            if (numRows === 0) {
                                                await Producer.create({
                                                    producer: value,
                                                })
                                            }
                                        })
                                    } catch (err) {
                                        if (index === array.length - 1) {
                                            return res.status(500).send({
                                                message:
                                                    err.message
                                            });
                                        }
                                    }
                                });
                            } else {
                                producers = null
                            }

                            if (licensors != "") {
                                arr_licensors.forEach(async (value, index, array) => {
                                    try {
                                        await Producer.findAll({
                                            where: {
                                                producer: value,
                                            },
                                        }).then(async data => {
                                            // console.log("data licensors", data.length)
                                            let numRows = data.length;
                                            if (numRows === 0) {
                                                await Producer.create({
                                                    producer: value,
                                                })
                                            }
                                        })
                                    } catch (err) {
                                        if (index === array.length - 1) {
                                            return res.status(500).send({
                                                message:
                                                    err.message
                                            });
                                        }
                                    }
                                });
                            } else {
                                licensors = null
                            }

                            if (studios != "") {
                                arr_studios.forEach(async (value, index, array) => {
                                    try {
                                        await Producer.findAll({
                                            where: {
                                                producer: value,
                                            },
                                        }).then(async data => {
                                            // console.log("data studios", data.length)
                                            let numRows = data.length;
                                            if (numRows === 0) {
                                                await Producer.create({
                                                    producer: value,
                                                })
                                            }
                                        })
                                    } catch (err) {
                                        if (index === array.length - 1) {
                                            return res.status(500).send({
                                                message:
                                                    err.message
                                            });
                                        }
                                    }
                                });
                            } else {
                                studios = null
                            }

                            arr_genres.forEach(async (value, index, array) => {
                                try {
                                    await Genre.findAll({
                                        where: {
                                            genre: value,
                                        },
                                    }).then(async data => {
                                        console.log("data genres", data.length)
                                        let numRows = data.length;
                                        if (numRows === 0) {
                                            await Genre.create({
                                                genre: value,
                                            })
                                        }
                                    })
                                } catch (err) {
                                    if (index === array.length - 1) {
                                        return res.status(500).send({
                                            message:
                                                err.message
                                        });
                                    }
                                }
                            });


                            await Table.create({
                                idMal: idMal,
                                base64: randomid,
                                url: url,
                                images: images_name,
                                imagesUrl: images_url,
                                title: title,
                                titleEnglish: title_english,
                                titleSynonyms: title_synonyms,
                                titleJapanese: title_japanese,
                                types: types,
                                episodes: episodes,
                                status: status,
                                aired: aired,
                                premiered: premiered,
                                broadcast: broadcast,
                                producers: producers,
                                licensors: licensors,
                                studios: studios,
                                source: source,
                                genres: genres,
                                duration: duration,
                                rating: rating,
                                score: score,
                                synopsis: synopsis,
                                views: views,
                                createdAt: published_time,
                                updateAt: modified_time,
                            }).then(data => {
                                return res.send(data);
                            }).catch(err => {
                                // console.log("err create Anime ", err)
                                return res.status(500).send({
                                    message:
                                        err.message
                                });
                            });
                        }).catch(err => {
                            return res.status(500).send({
                                message:
                                    err.message
                            });
                        })
                    }
                })
            } else {
                //status 406 = not acceptable
                return res.status(406).send({
                    message: "Judul Anime Sudah Ada"
                });
            }
        }).catch(err => {
            return res.status(500).send({
                message:
                    err.message
            });
        });
    })

};

// Retrieve all from the database.
exports.Dt = (req, res) => {
    var draw = req.body.draw;
    var order = req.body.order[0].dir;
    var start = parseInt(req.body.start);
    var end = parseInt(req.body.length);
    var search = req.body.search.value;
    Table.findAll({
        where: {
            title: {
                [Op.substring]: search
            },
        },
        order: [
            ['id', order],
        ],
        offset: start, limit: end,
    })
        .then(data => {
            // console.log(data)
            var recordsTotal = data.length;
            var Obj = [];
            data.forEach(function (element, index) {
                var id = element.id;
                var title = element.title;
                const hari = element.createdAt.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); // hari, tanggal(angka) bulan(text) tahun(angka)
                const menit = element.createdAt.toLocaleTimeString(); // 00:00:00 AM/PM
                var published_time = hari + ' at ' + menit

                Obj.push([
                    title = title,
                    published_time = published_time,
                    id = id,
                ])
            });
            response.datatables(draw, recordsTotal, recordsTotal, Obj, res);
        })
        .catch(err => {
            console.log('err findAll anime')
            res.status(500).send({
                message:
                    err.message
            });
        });


};

// Find a single with an id
exports.findOne = (req, res) => {
    let id = req.params.id;
    Table.findByPk(id)
        .then(data => {
            res.send(JSON(data));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Anime with id=" + id
            });
        });

};



// Update a by the id in the request
exports.update = (req, res) => {
    // const id = req.params.id;

    // Tutorial.update(req.body, {
    //     where: { id: id }
    // })
    //     .then(num => {
    //         if (num == 1) {
    //             res.send({
    //                 message: "Tutorial was updated successfully."
    //             });
    //         } else {
    //             res.send({
    //                 message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Error updating Tutorial with id=" + id
    //         });
    //     });

};

// Delete a with the specified id in the request
exports.delete = (req, res) => {
    // const id = req.params.id;

    // Tutorial.destroy({
    //     where: { id: id }
    // })
    //     .then(num => {
    //         if (num == 1) {
    //             res.send({
    //                 message: "Tutorial was deleted successfully!"
    //             });
    //         } else {
    //             res.send({
    //                 message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Could not delete Tutorial with id=" + id
    //         });
    //     });

};

