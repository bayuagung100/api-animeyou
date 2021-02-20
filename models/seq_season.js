'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seq_Season extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Seq_Season.init({
    season: DataTypes.STRING,
    year: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Seq_Season',
    timestamps: false
  });
  return Seq_Season;
};