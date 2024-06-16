'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MovimentacaoEstoque extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MovimentacaoEstoque.belongsTo(models.Estoque, { foreignKey: 'id_estoque', as: 'estoque' });
      MovimentacaoEstoque.belongsTo(models.Produto, { foreignKey: 'id_produto', as: 'produto' });
    }
  }
  MovimentacaoEstoque.init({
    id_estoque: { type: DataTypes.INTEGER, allowNull: false },
    id_produto: { type: DataTypes.INTEGER, allowNull: false },
    quantidade: { type: DataTypes.INTEGER, allowNull: false },
    tipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    data: { type: DataTypes.DATE, allowNull: false },
    descricao: { type: DataTypes.STRING }
  },
    {
      sequelize,
      modelName: 'MovimentacaoEstoque',
      tableName: 'movimentacao_estoque',
    });
  return MovimentacaoEstoque;
};