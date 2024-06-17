'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Produto.belongsTo(models.Empresa,{foreignKey:'id_empresa'});
      Produto.belongsTo(models.CategoriaProduto,{foreignKey:'id_categoria_produto', as:'categoria_produto'});
    }
  }
  Produto.init({
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_categoria_produto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categoria_produto',
        key: 'id'
      },
    },
    quantidade: {
      type: DataTypes.INTEGER,
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
    modelName: 'Produto',
    tableName: 'produto'
  });
  return Produto;
};