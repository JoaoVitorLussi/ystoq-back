'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EstoqueProduto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EstoqueProduto.belongsTo(models.Estoque, { foreignKey: 'id_estoque', as: 'estoque' });
      EstoqueProduto.belongsTo(models.Produto, { foreignKey: 'id_produto', as: 'produto' })
    }
  }
  EstoqueProduto.init({
    id_estoque: { type: DataTypes.INTEGER, allowNull: false },
    id_produto: { type: DataTypes.INTEGER, allowNull: false },
    quantidade: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'EstoqueProduto',
    tableName: 'estoque_produto',
  });
  return EstoqueProduto;
};