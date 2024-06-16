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

router.get('/produto/:id',
    async function (req, resp){
        try{
            let data = null;
            const produto = await model.Produto.schema('public');
            data = await produto.findByPk(req.params.id);
            if(data == null){
                resp.status(404).json({error: "Produto não encontrado."});
            }
            resp.json(data).status(200);
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            resp.status(500).json({ error: "Erro ao buscar produto." });
        }
});

router.put('/produto/:id',
    async function (req, resp){
        try{
            let data = null;
            const produto = await model.Produto.schema('public');
            data = await produto.update(req.body, {where: {id: req.params.id}});
            resp.json({detail: "Produto editado com sucesso"}).status(200);
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            resp.status(500).json({ error: "Erro ao atualizar produto." });
        }
});

router.delete('/produto/:id',
    async function (req, resp){
        try{
            let data = null;
            const produto = await model.Produto.schema('public');
            data = await produto.destroy({where: {id: req.params.id}});
            if(data == 0){
              resp.status(404).json({error: "Produto não encontrado."});
            }else{
              resp.status(200).json({detail: "Produto deletado"});
            }
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            resp.status(500).json({ error: "Erro ao deletar produto." });
        }
});

  module.exports = router;