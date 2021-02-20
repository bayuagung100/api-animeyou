'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Seq_AnimeEpisodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      animeId: {
        type: Sequelize.STRING
      },
      judul: {
        type: Sequelize.STRING
      },
      base64: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      episode: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.STRING
      },
      imagesUrl: {
        type: Sequelize.STRING
      },
      videosUrl: {
        type: Sequelize.TEXT
      },
      mkv240p: {
        type: Sequelize.TEXT
      },
      mkv360p: {
        type: Sequelize.TEXT
      },
      mkv480p: {
        type: Sequelize.TEXT
      },
      mkv720p: {
        type: Sequelize.TEXT
      },
      mkv1080p: {
        type: Sequelize.TEXT
      },
      mp4240p: {
        type: Sequelize.TEXT
      },
      mp4360p: {
        type: Sequelize.TEXT
      },
      mp4480p: {
        type: Sequelize.TEXT
      },
      mp4720p: {
        type: Sequelize.TEXT
      },
      mp41080p: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Seq_AnimeEpisodes');
  }
};