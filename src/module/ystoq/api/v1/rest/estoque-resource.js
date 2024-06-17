const express = require("express");
const router = express.Router();
const model = require("../../../models");
const authMiddleware = require("../../../../../../middlewares/authMiddleware");
const { Op } = require("sequelize");
const usuarioSevice = require("../../../../../services/usuario-service");

router.post("/estoque", authMiddleware, async function (req, resp) {
  const { descricao, quantidade, endereco } = req.body;
  try {
    let estoqueExists = await model.Estoque.findOne({
      where: {
        descricao,
      },
    });

    if (estoqueExists) {
      return resp
        .status(200)
        .json({ error: "Já existe um estoque com esse nome de usuário." });
    }

    let user = await usuarioSevice.getIdByEmail(req.email)

    let data = null;
    const estoque = await model.Estoque.schema("public");
    data = await estoque.create({ descricao, quantidade, endereco, id_empresa: user.id_empresa });
    resp.json({ detail: "Estoque criado com sucesso" }).status(200);
  } catch (error) {
    console.error("Erro ao criar estoque:", error);
    resp.status(500).json({ error: "Erro ao criar estoque." });
  }
});

router.get("/estoque", authMiddleware, async function (req, resp) {
  try {
    let { search = "" } = req.query;
    let data = null;
    let user = await usuarioSevice.getIdByEmail(req.email)
    const estoque = await model.Estoque.schema("public");
    if (user.id === 1) {
      data = await estoque.findAll({
        where: {
          descricao: {
            [Op.like]: `%${search}%`,
          },
        },
      });
    } else {
      data = await estoque.findAll({
        where: {
          descricao: {
            [Op.like]: `%${search}%`,
          },
          id_empresa: user.id_empresa
        },
      });
    }
    if (data == null) {
      resp.status(404).json({ error: "Nenhum estoque encontrado." });
    }
    resp.json(data).status(200);
  } catch (error) {
    console.error("Erro ao buscar estoque:", error);
    resp.status(500).json({ error: "Erro ao buscar estoque." });
  }
});

router.get("/estoque/:id", authMiddleware, async function (req, resp) {
  try {
    let data = null;
    const estoque = await model.Estoque.schema("public");
    data = await estoque.findByPk(req.params.id);
    if (data == null) {
      resp.status(404).json({ error: "Nenhum estoque encontrado." });
    }
    resp.json(data).status(200);
  } catch (error) {
    console.error("Erro ao buscar estoque:", error);
    resp.status(500).json({ error: "Erro ao buscar estoque." });
  }
});

router.put("/estoque/:id", authMiddleware, async function (req, resp) {
  try {
    let data = null;
    const estoque = await model.Estoque.schema("public");
    data = await estoque.update(req.body, { where: { id: req.params.id } });
    resp.json({ detail: "Estoque editado com sucesso" }).status(200);
  } catch (error) {
    console.error("Erro ao atualizar estoque:", error);
    resp.status(500).json({ error: "Erro ao atualizar estoque." });
  }
});

router.delete("/estoque/:id", authMiddleware, async function (req, resp) {
  try {
    let data = null;
    const estoque = await model.Estoque.schema("public");
    const movimentacao = await model.MovimentacaoEstoque.schema("public");
    let estoqueMovimentacao = await movimentacao.findAll({ where: { id_estoque: req.params.id } })

    if (estoqueMovimentacao.length > 0) {
      resp.status(400).json({ error: "Não é possível deletar o estoque, pois existem movimentações associadas a ele." });
      return;
    }

    data = await estoque.destroy({ where: { id: req.params.id } });
    if (data == 0) {
      resp.status(404).json({ error: "Estoque não encontrado." });
    } else {
      resp.status(200).json({ detail: "Estoque deletado com sucesso." });
    }
  } catch (error) {
    console.error("Erro ao deletar estoque:", error);
    resp.status(500).json({ error: "Erro ao deletar estoque." });
  }
});

router.get("/detalhes-estoque/:id", authMiddleware, async function (req, resp) {
  try {
    let data = null;
    const estoque = await model.Estoque.schema("public");
    data = await estoque.findByPk(req.params.id);
    if (data == null) {
      resp.status(404).json({ error: "Nenhum estoque encontrado." });
    }
    resp.json(data).status(200);
  } catch (error) {
    console.error("Erro ao buscar estoque:", error);
    resp.status(500).json({ error: "Erro ao buscar estoque." });
  }
});


router.get("/estoque-produto/:id", authMiddleware, async function (req, resp) {
  try {
    const estoqueId = req.params.id;
    const estoque = await model.EstoqueProduto.schema("public");
    let data = await estoque.findAll({
      where: { id_estoque: estoqueId },
      include: [
        { model: model.Estoque, as: 'estoque' },
        { model: model.Produto, as: 'produto' }
      ]
    });

    if (!data) {
      return resp.status(404).json({ error: "Nenhum estoque encontrado." });
    }

    resp.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar estoque e produtos:", error);
    resp.status(500).json({ error: "Erro ao buscar estoque e produtos." });
  }
});

module.exports = router;
