const express = require('express');
const router = express.Router();
const model = require('../../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const produto = require('../../../models/produto');

router.post('/produto',
    async function (req, resp){
      const {descricao,id_categoria_produto,quantidade,id_empresa} = req.body;
      console.log(req.body);
       try{
          let produtoExists = await model.Produto.findOne({
            where: {
              descricao,id_categoria_produto,quantidade,id_empresa
            }
          });
      
          if (produtoExists) {
            return resp.status(200).json({ error: "Este produto já encontra-se cadastrado."});
          }

          let data = null;
          const produto = await model.Produto.schema('public');
          data = await produto.create({descricao,id_categoria_produto,quantidade,id_empresa});
          resp.json({detail: "Produto criado com sucesso"}).status(201);
       }catch (error) {
          console.error("Não foi possível criar o produto", error);
          resp.status(500).json({ error: "Erro ao criar o produto." });
       }
});

router.get('/produto', async function (req, res) {
    try {
        let data = null;
        const produto = await model.Produto.schema('public');
        data = await produto.findAll();
        res.json(data).status(200);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).json({ error: "Erro ao buscar produtos." });
    }
  });

  module.exports = router;