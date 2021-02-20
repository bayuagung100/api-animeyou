'use strict';
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync("bayuagung123", salt);
// const cekHash = bcrypt.compareSync("bayuagung123", hash);
// console.log(hash)
// console.log(cekHash)
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Seq_Users', [{
    name: 'Balar',
    username: 'bayuagung100',
    email: 'bayuagung100@gmail.com',
    password: bcrypt.hashSync("bayuagung123", salt),
    createdAt: new Date(),
    updatedAt: new Date()
  }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Seq_Users', null, {});
  }
};
