const model = require('../module/ystoq/models');
const enumTipoMovimentacao = require('../module/ystoq/enums/tipo-movimentacao.js');

class EstoqueProdutoError extends Error {
  constructor(message) {
    super(message);
    this.name = 'EstoqueProdutoError';
  }
}

//#region métodos publicos

async function updateEstoqueProduto(id_estoque, id_produto, tipo, quantidade) {
  const estoqueProduto = await model.EstoqueProduto.schema("public");
  let estoqueProdutoDisponivel = await estoqueProduto.findOne({
    where: {
      id_estoque: id_estoque,
      id_produto: id_produto
    }
  });

  let novaQuantidade = await validateEstoqueProduto(estoqueProdutoDisponivel, tipo, quantidade, id_estoque);

  if (estoqueProdutoDisponivel == null) {
    await estoqueProduto.create({ id_estoque, id_produto, quantidade });
  }
  else {
    await estoqueProduto.update({ quantidade: novaQuantidade }, { where: { id: estoqueProdutoDisponivel.id } });
  }
}

async function undoMovimentacaoEstoque(id) {
  const movimentacao = await model.MovimentacaoEstoque.schema("public");
  const estoqueProduto = await model.EstoqueProduto.schema("public");

  const movimentacao_estoque = await movimentacao.findByPk(id);
  const estoque_produto = await estoqueProduto.findOne({ where: { id_estoque: movimentacao_estoque.id_estoque, id_produto: movimentacao_estoque.id_produto } });

  let novaQuantidade = 0;
  if (movimentacao_estoque.tipo == enumTipoMovimentacao.saida) {
    novaQuantidade = estoque_produto.quantidade + movimentacao_estoque.quantidade;
  }
  else {
    novaQuantidade = estoque_produto.quantidade - movimentacao_estoque.quantidade;
  }

  await estoqueProduto.update({ quantidade: novaQuantidade }, { where: { id: estoque_produto.id } });
}

//#endregion métodos publicos

//#region métodos privados

async function validateEstoqueProduto(estoqueProdutoDisponivel, tipo, quantidade, id_estoque) {
  let novaQuantidade = 0;

  if (tipo == enumTipoMovimentacao.saida) {
    if (estoqueProdutoDisponivel == null) {
      throw new EstoqueProdutoError("Produto não disponível no estoque.");
    }

    novaQuantidade = estoqueProdutoDisponivel.quantidade - quantidade;
    if (novaQuantidade < 0) {
      throw new EstoqueProdutoError("A quantidade informada é menor que a disponível.");
    }
  }
  else {
    await validateEstoqueFull(id_estoque, quantidade);
    novaQuantidade = estoqueProdutoDisponivel?.quantidade + quantidade;
  }

  return novaQuantidade
}

async function validateEstoqueFull(id_estoque, quantidade) {
  const estoqueProduto = await model.EstoqueProduto.schema("public");
  const estoque = await model.Estoque.schema("public");

  const quantidadeAtual = await estoqueProduto.sum('quantidade', {
    where: { id_estoque },
  });

  const quantidadeMaxima = await estoque.findOne({
    where: { id: id_estoque },
    attributes: ['quantidade']
  })

  if ((quantidadeAtual + quantidade) > quantidadeMaxima.quantidade) {
    throw new EstoqueProdutoError("A quantidade informada é superior a capacidade do estoque.");
  }
}

//#endregion métodos privados

module.exports = {
  updateEstoqueProduto,
  undoMovimentacaoEstoque,
  EstoqueProdutoError
};