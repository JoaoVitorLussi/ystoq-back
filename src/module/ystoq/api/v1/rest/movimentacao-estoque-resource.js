const express = require("express");
const router = express.Router();
const model = require("../../../models");
const enumTipoMovimentacao = require('../../../enums/tipo-movimentacao.js');

router.post("/movimentacao-estoque", async function (req, resp) {
  const { id_estoque, id_produto, quantidade, tipo, data, descricao } = req.body;
  try {
    const estoqueProduto = await model.EstoqueProduto.schema("public");
    let estoqueProdutoDisponivel = await estoqueProduto.findOne({
      where: {
        id_estoque,
        id_produto
      },
    });

    let novaQuantidade = 0;

    if (tipo == enumTipoMovimentacao.saida) {
      if (estoqueProdutoDisponivel == null) {
        return resp.status(400).json({ error: "Produto não disponível no estoque." });
      }

      novaQuantidade = estoqueProdutoDisponivel.quantidade - quantidade;
      if (novaQuantidade < 0) {
        return resp
          .status(400)
          .json({ error: "A quantidade informada é menor que a disponível" });
      }
    }
    else {
      novaQuantidade = estoqueProdutoDisponivel?.quantidade + quantidade;
    }

    if (estoqueProdutoDisponivel == null) {
      await estoqueProduto.create({ id_estoque, id_produto, quantidade });
    }
    else {
      await estoqueProduto.update({ quantidade: novaQuantidade }, { where: { id: estoqueProdutoDisponivel.id } });
    }

    let dados = null;
    const movimentacao = await model.MovimentacaoEstoque.schema("public");
    dados = await movimentacao.create({ id_estoque, id_produto, quantidade, tipo, data, descricao });
    resp.json({ detail: "Movimetação adicionada com sucesso" }).status(201);
  } catch (error) {
    console.error("Erro ao criar movimetação:", error);
    resp.status(500).json({ error: "Erro ao criar movimetação." });
  }
});

router.get("/movimentacao-estoque", async function (req, resp) {
  try {
    let data = null;
    const movimentacao = await model.MovimentacaoEstoque.schema("public");
    data = await movimentacao.findAll();
    if (data == null) {
      resp.status(404).json({ error: "Nenhuma movimentação encontrada." });
    }
    resp.json(data).status(200);
  } catch (error) {
    console.error("Erro ao buscar estoque:", error);
    resp.status(500).json({ error: "Erro ao buscar estoque." });
  }
});

router.get("/movimentacao-estoque/:id", async function (req, resp) {
  try {
    let data = null;
    const movimentacao = await model.MovimentacaoEstoque.schema("public");
    data = await movimentacao.findByPk(req.params.id);
    if (data == null) {
      resp.status(404).json({ error: "Nenhuma movimentação encontrada." });
    }
    resp.json(data).status(200);
  } catch (error) {
    console.error("Erro ao buscar movimentação:", error);
    resp.status(500).json({ error: "Erro ao buscar movimentação." });
  }
});

router.put("/movimentacao-estoque/:id", async function (req, resp) {
  try {
    let data = null;
    const movimentacao = await model.MovimentacaoEstoque.schema("public");
    data = await movimentacao.update(req.body, { where: { id: req.params.id } });
    resp.json({ detail: "Movimentação editada com sucesso" }).status(200);
  } catch (error) {
    console.error("Erro ao atualizar movimentação:", error);
    resp.status(500).json({ error: "Erro ao atualizar movimentação." });
  }
});

router.delete("/movimentacao-estoque/:id", async function (req, resp) {
  try {
    const movimentacao = await model.MovimentacaoEstoque.schema("public");
    const estoqueProduto = await model.EstoqueProduto.schema("public");

    const movimentacao_estoque = await movimentacao.findByPk(req.params.id);
    let estoque_produto = await estoqueProduto.findOne({ where: { id_estoque: movimentacao_estoque.id_estoque, id_produto: movimentacao_estoque.id_produto } });

    let novaQuantidade = 0;
    if (movimentacao_estoque.tipo == enumTipoMovimentacao.saida) {
      novaQuantidade = estoque_produto.quantidade + movimentacao_estoque.quantidade;
    }
    else {
      novaQuantidade = estoque_produto.quantidade - movimentacao_estoque.quantidade;
    }

    await estoqueProduto.update({ quantidade: novaQuantidade }, { where: { id: estoque_produto.id } });
    let data = null;
    data = await movimentacao.destroy({ where: { id: req.params.id } });
    if (data == 0) {
      resp.status(404).json({ error: "Movimentação não encontrada." });
    } else {
      resp.status(200).json({ detail: "Movimentação deletada com sucesso." });
    }
  } catch (error) {
    console.error("Erro ao deletar movimentação:", error);
    resp.status(500).json({ error: "Erro ao deletar movimentação." });
  }
});

module.exports = router;
