'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seq_AnimeEpisode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Seq_AnimeEpisode.init({
    animeId: DataTypes.STRING,
    judul: DataTypes.STRING,
    base64: DataTypes.STRING,
    url: DataTypes.STRING,
    episode: DataTypes.STRING,
    images: DataTypes.STRING,
    imagesUrl: DataTypes.STRING,
    videosUrl: DataTypes.TEXT,
    mkv240p: DataTypes.TEXT,
    mkv360p: DataTypes.TEXT,
    mkv480p: DataTypes.TEXT,
    mkv720p: DataTypes.TEXT,
    mkv1080p: DataTypes.TEXT,
    mp4240p: DataTypes.TEXT,
    mp4360p: DataTypes.TEXT,
    mp4480p: DataTypes.TEXT,
    mp4720p: DataTypes.TEXT,
    mp41080p: DataTypes.TEXT,
    views: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Seq_AnimeEpisode',
  });
  return Seq_AnimeEpisode;
};