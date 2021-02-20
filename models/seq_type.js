'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seq_Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Seq_Type.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Seq_Type',
  });
  return Seq_Type;
};