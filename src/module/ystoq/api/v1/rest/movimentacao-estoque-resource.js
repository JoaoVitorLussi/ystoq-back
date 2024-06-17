const express = require("express");
const router = express.Router();
const model = require("../../../models");
const authMiddleware = require('../../../../../..//middlewares/authMiddleware');
const movimentacaoEstoqueSevice = require('../../../../../services/movimentacao-estoque-service');
const { Op } = require("sequelize");

router.post("/movimentacao-estoque", authMiddleware, async function (req, resp) {
  const { id_estoque, id_produto, quantidade, tipo, data, descricao } = req.body;
  try {

    await movimentacaoEstoqueSevice.updateEstoqueProduto(id_estoque, id_produto, tipo, quantidade);

    let dados = null;
    const movimentacao = await model.MovimentacaoEstoque.schema("public");
    dados = await movimentacao.create({ id_estoque, id_produto, quantidade, tipo, data, descricao });
    resp.json({ detail: "Movimetação adicionada com sucesso" }).status(201);
  } catch (error) {
    if (error instanceof movimentacaoEstoqueSevice.EstoqueProdutoError) {
      resp.status(400).json({ error: error.message });
    } else {
      resp.status(500).json({ error: "Erro ao criar movimentação." });
    }
  }
});

router.get("/movimentacoes-estoque/:id_estoque", authMiddleware, async function (req, resp) {
  try {
    let { search = "" } = req.query;
    let data = null;
    const movimentacao = await model.MovimentacaoEstoque.schema("public");
    data = await movimentacao.findAll({
      where: {
        id_estoque: req.params.id_estoque,
      },
      include: [{
        model: model.Produto,
        as: 'produto',
        where: {
          descricao: { [Op.like]: `%${search}%` }
        }
      }]
    });
    if (data == null) {
      resp.status(404).json({ error: "Nenhuma movimentação encontrada." });
    }
    resp.json(data).status(200);
  } catch (error) {
    resp.status(500).json({ error: "Erro ao buscar estoque." });
  }
});

router.get("/movimentacao-estoque/:id", authMiddleware, async function (req, resp) {
  try {
    let data = null;
    const movimentacao = await model.MovimentacaoEstoque.schema("public");
    data = await movimentacao.findOne({
      where: { id: req.params.id },
      include: [
        { model: model.Estoque, as: 'estoque' },
        { model: model.Produto, as: 'produto' }
      ]
    });
    if (data == null) {
      resp.status(404).json({ error: "Nenhuma movimentação encontrada." });
    }
    resp.json(data).status(200);
  } catch (error) {
    resp.status(500).json({ error: "Erro ao buscar movimentação." });
  }
});

router.put("/movimentacao-estoque/:id", authMiddleware, async function (req, resp) {
  try {
    let data = null;
    const movimentacao = await model.MovimentacaoEstoque.schema("public");
    data = await movimentacao.update(req.body, { where: { id: req.params.id } });
    resp.json({ detail: "Movimentação editada com sucesso" }).status(200);
  } catch (error) {
    resp.status(500).json({ error: "Erro ao atualizar movimentação." });
  }
});

router.delete("/movimentacao-estoque/:id", authMiddleware, async function (req, resp) {
  try {

    await movimentacaoEstoqueSevice.undoMovimentacaoEstoque(req.params.id);

    let data = null;
    data = await movimentacao.destroy({ where: { id: req.params.id } });
    if (data == 0) {
      resp.status(404).json({ error: "Movimentação não encontrada." });
    } else {
      resp.status(200).json({ detail: "Movimentação deletada com sucesso." });
    }
  } catch (error) {
    resp.status(500).json({ error: "Erro ao deletar movimentação." });
  }
});

module.exports = router;
