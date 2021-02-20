const db = require("../../models");
const Table = require("../../models/seq_user")(db.sequelize, db.Sequelize);
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../jwt/AuthConfig");


// Create and Save a new
exports.create = (req, res) => {
    // // Validate request
    // if (!req.body.title) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // // Create a Tutorial
    // const tutorial = {
    //     title: req.body.title,
    //     description: req.body.description,
    //     published: req.body.published ? req.body.published : false
    // };

    // // Save Tutorial in the database
    // Tutorial.create(tutorial)
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the Tutorial."
    //         });
    //     });


};

// Retrieve all from the database.
exports.findAll = (req, res) => {
    Table.findAll()
        .then(data => {
            let newData = []
            data.forEach(element => {
                newData.push({
                    id: element.id,
                    name: element.name,
                    username: element.username,
                    email: element.email,
                })
            });
            res.send(newData);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });

    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    // Tutorial.findAll({ where: condition })
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving tutorials."
    //         });
    //     });

};

// Find a single with an id
exports.findOne = (req, res) => {
    let id = req.params.id;
    Table.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });

};

exports.auth = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    Table.findOne({
        where: {
            username: username,
            // password: hash
        }
    })
        .then(user => {
            // console.log(user)
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid Password!"
                });
            }
            res.send({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
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

// Delete all from the database.
exports.deleteAll = (req, res) => {
    // Tutorial.destroy({
    //     where: {},
    //     truncate: false
    // })
    //     .then(nums => {
    //         res.send({ message: `${nums} Tutorials were deleted successfully!` });
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while removing all tutorials."
    //         });
    //     });

};

// Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//     Tutorial.findAll({ where: { published: true } })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving tutorials."
//             });
//         });
// };
