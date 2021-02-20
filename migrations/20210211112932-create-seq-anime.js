'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Seq_Animes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idMal: {
        type: Sequelize.STRING
      },
      base64: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.STRING
      },
      imagesUrl: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.TEXT
      },
      titleEnglish: {
        type: Sequelize.TEXT
      },
      titleSynonyms: {
        type: Sequelize.TEXT
      },
      titleJapanese: {
        type: Sequelize.TEXT
      },
      types: {
        type: Sequelize.STRING
      },
      episodes: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('Finished Airing', 'Currently Airing')
      },
      aired: {
        type: Sequelize.STRING
      },
      premiered: {
        type: Sequelize.STRING
      },
      broadcast: {
        type: Sequelize.STRING
      },
      producers: {
        type: Sequelize.STRING
      },
      licensors: {
        type: Sequelize.STRING
      },
      studios: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },
      genres: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.STRING
      },
      synopsis: {
        type: Sequelize.TEXT('long')
      },
      views: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Seq_Animes');
  }
};