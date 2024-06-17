const express = require('express');
const router = express.Router();
const model = require('../../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioService = require('../../../../../../src/services/usuario-service');
const authMiddleware = require('../../../../../..//middlewares/authMiddleware');
const { Op } = require("sequelize");

router.post('/categoria-produto', authMiddleware,
  async function (req, resp) {
    const { descricao } = req.body;
    let user = await usuarioService.getIdByEmail(req.email);
    try {
      let categoriaExists = await model.CategoriaProduto.findOne({
        where: {
          descricao: descricao,
          id_empresa: user.id_empresa
        }
      });

      if (categoriaExists) {
        return resp.status(200).json({ error: "Esta categoria de produto já encontra-se cadastrada." });
      }

      let data = null;
      const categoria = await model.CategoriaProduto.schema('public');
      data = await categoria.create({ descricao: descricao, id_empresa: user.id_empresa });
      resp.json({ detail: "Categoria criada com sucesso" }).status(201);
    } catch (error) {
      console.error("Não foi possível criar a categoria", error);
      resp.status(500).json({ error: "Erro ao criar categoria." });
    }
  });

router.get('/categoria-produto', authMiddleware, async function (req, res) {
  try {
    let { search = "" } = req.query;
    let data = null;
    let user = await usuarioService.getIdByEmail(req.email);
    const categoria = await model.CategoriaProduto.schema('public');

    if (user.id === 1) {
      data = await categoria.findAll({
        where: {
          descricao: {
            [Op.like]: `%${search}%`,
          },
        }
      });
    } else {
      data = await categoria.findAll({
        where: {
          descricao: {
            [Op.like]: `%${search}%`,
          },
          id_empresa: user.id_empresa
        }
      });
    }

    if (data == null) {
      res.status(404).json({ error: "Nenhuma categoria de produto encontrada." });
    }
    
    res.json(data).status(200);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    res.status(500).json({ error: "Erro ao buscar categorias." });
  }
});

router.get('/categoria-produto/:id', authMiddleware,
  async function (req, resp) {
    try {
      let data = null;
      const categoria = await model.CategoriaProduto.schema('public');
      data = await categoria.findByPk(req.params.id);
      if (data == null) {
        resp.status(404).json({ error: "Categoria não encontrada." });
      }
      resp.json(data).status(200);
    } catch (error) {
      console.error("Erro ao buscar categoria:", error);
      resp.status(500).json({ error: "Erro ao buscar categoria." });
    }
  });

router.put('/categoria-produto/:id', authMiddleware,
  async function (req, resp) {
    try {
      let data = null;
      const categoria = await model.CategoriaProduto.schema('public');
      data = await categoria.update(req.body, { where: { id: req.params.id } });
      resp.json({ detail: "Categoria atualizada com sucesso" }).status(200);
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      resp.status(500).json({ error: "Erro ao atualizar categoria." });
    }
  });

router.delete('/categoria-produto/:id', authMiddleware,
  async function (req, resp) {
    try {
      let data = null;
      const categoria = await model.CategoriaProduto.schema('public');
      data = await categoria.destroy({ where: { id: req.params.id } });
      if (data == 0) {
        resp.status(404).json({ error: "Categoria não encontrada." });
      } else {
        resp.status(200).json({ detail: "Categoria deletada" });
      }
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      resp.status(500).json({ error: "Erro ao deletar categoria." });
    }
  });

module.exports = router;