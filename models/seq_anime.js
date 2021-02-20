'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seq_Anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Seq_Anime.init({
    idMal: DataTypes.STRING,
    base64: DataTypes.STRING,
    url: DataTypes.STRING,
    images: DataTypes.STRING,
    imagesUrl: DataTypes.STRING,
    title: DataTypes.TEXT,
    titleEnglish: DataTypes.TEXT,
    titleSynonyms: DataTypes.TEXT,
    titleJapanese: DataTypes.TEXT,
    types: DataTypes.STRING,
    episodes: DataTypes.STRING,
    status: DataTypes.STRING,
    aired: DataTypes.STRING,
    premiered: DataTypes.STRING,
    broadcast: DataTypes.STRING,
    producers: DataTypes.STRING,
    licensors: DataTypes.STRING,
    studios: DataTypes.STRING,
    source: DataTypes.STRING,
    genres: DataTypes.STRING,
    duration: DataTypes.STRING,
    rating: DataTypes.STRING,
    score: DataTypes.STRING,
    synopsis: DataTypes.TEXT('long'),
    views: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Seq_Anime',
  });
  return Seq_Anime;
};