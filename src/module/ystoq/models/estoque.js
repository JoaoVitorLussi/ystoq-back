'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estoque extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Estoque.belongsTo(models.Empresa, {
        foreignKey: 'id_empresa',
        as: 'empresa'
      });
    }
  }
  Estoque.init({
    descricao: DataTypes.STRING,
    endereco: DataTypes.STRING,
    quantidade: DataTypes.INTEGER,
    id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'empresa',
        key: 'id'
      },
    }
  }, {
    sequelize,
    modelName: 'Estoque',
    tableName: 'estoque',
  });
  return Estoque;
};