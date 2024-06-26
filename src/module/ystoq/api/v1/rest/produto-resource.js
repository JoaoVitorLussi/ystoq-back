const express = require('express');
const router = express.Router();
const model = require('../../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const produto = require('../../../models/produto');
const usuarioService = require('../../../../../../src/services/usuario-service');
const authMiddleware = require('../../../../../..//middlewares/authMiddleware');
const { Op } = require("sequelize");

router.post('/produto', authMiddleware, async function (req, resp) {
    const { descricao, id_categoria_produto, quantidade } = req.body;
    try {
        let user = await usuarioService.getIdByEmail(req.email);

        let produtoExists = await model.Produto.findOne({
            where: {
                descricao: descricao,
                id_categoria_produto: id_categoria_produto,
                quantidade: quantidade,
                id_empresa: user.id_empresa
            }
        });

        if (produtoExists) {
            return resp.status(200).json({ error: "Este produto já encontra-se cadastrado." });
        }

        const produto = await model.Produto.schema('public');
        const data = await produto.create({
            descricao,
            id_categoria_produto,
            quantidade,
            id_empresa: user.id_empresa
        });

        resp.status(201).json({ detail: "Produto criado com sucesso", produto: data });
    } catch (error) {
        console.error("Não foi possível criar o produto", error);
        resp.status(500).json({ error: "Erro ao criar o produto." });
    }
});

router.get('/produto', authMiddleware, async function (req, res) {
    try {
        let { search = "" } = req.query;
        let data = null;
        let user = await usuarioService.getIdByEmail(req.email);
        const produto = await model.Produto.schema('public');

        if (user.id === 1) {
            data = await produto.findAll({
                where: {
                    descricao: {
                        [Op.like]: `%${search}%`,
                    },
                },
                include: [{ model: model.CategoriaProduto, as: 'categoria_produto' }]
            });
        } else {
            data = await produto.findAll({
                where: {
                    descricao: {
                        [Op.like]: `%${search}%`,
                    },
                    id_empresa: user.id_empresa
                },
                include: [{ model: model.CategoriaProduto, as: 'categoria_produto' }]
            });
        }

        if (data == null) {
            res.status(404).json({ error: "Nenhum produto encontrado." });
        }

        res.json(data).status(200);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).json({ error: "Erro ao buscar produtos." });
    }
});

router.get('/produto/:id', authMiddleware,
    async function (req, resp) {
        try {
            let data = null;
            const produto = await model.Produto.schema('public');
            data = await produto.findOne({
                where: { id: req.params.id },
                include: [
                  { model: model.CategoriaProduto, as: 'categoria_produto' }
                ]
              });
            if (data == null) {
                resp.status(404).json({ error: "Produto não encontrado." });
            }
            resp.json(data).status(200);
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            resp.status(500).json({ error: "Erro ao buscar produto." });
        }
    });

router.put('/produto/:id', authMiddleware,
    async function (req, resp) {
        try {
            let data = null;
            const produto = await model.Produto.schema('public');
            data = await produto.update(req.body, { where: { id: req.params.id } });
            resp.json({ detail: "Produto editado com sucesso" }).status(200);
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            resp.status(500).json({ error: "Erro ao atualizar produto." });
        }
    });

router.delete('/produto/:id', authMiddleware,
    async function (req, resp) {
        try {
            let data = null;
            const produto = await model.Produto.schema('public');
            data = await produto.destroy({ where: { id: req.params.id } });
            if (data == 0) {
                resp.status(404).json({ error: "Produto não encontrado." });
            } else {
                resp.status(200).json({ detail: "Produto deletado" });
            }
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            resp.status(500).json({ error: "Erro ao deletar produto." });
        }
    });

module.exports = router;