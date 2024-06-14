'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoriaProduto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CategoriaProduto.belongsTo(models.Empresa,{foreignKey:'id_empresa'})
    }
  }
  CategoriaProduto.init({
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
    modelName: 'CategoriaProduto',
    tableName: 'categoria_produto'
  });
  return CategoriaProduto;
};