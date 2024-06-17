const express = require('express');
const router = express.Router();
const model = require('../../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioService = require('../../../../../../src/services/usuario-service');
const authMiddleware = require('../../../../../..//middlewares/authMiddleware');

router.post('/categoria', authMiddleware,
    async function (req, resp){
      console.log(req);
      const {descricao} = req.body;
      console.log(req.email);
      let user = await usuarioService.getIdByEmail(req.email);
      console.log(req.email);
      console.log(req.body);
       try{
          let categoriaExists = await model.CategoriaProduto.findOne({
            where: {
              descricao: descricao,
              id_empresa: user.id_empresa
            }
          });
      
          if (categoriaExists) {
            return resp.status(200).json({ error: "Esta categoria de produto já encontra-se cadastrada."});
          }

          let data = null;
          const categoria = await model.CategoriaProduto.schema('public');
          data = await categoria.create({descricao: descricao,id_empresa: user.id_empresa});
          resp.json({detail: "Categoria criada com sucesso"}).status(201);
       }catch (error) {
          console.error("Não foi possível criar a categoria", error);
          resp.status(500).json({ error: "Erro ao criar categoria." });
       }
});

router.get('/categoria', async function (req, res) {
    try {
        let data = null;
        const categoria = await model.CategoriaProduto.schema('public');
        data = await categoria.findAll();
        res.json(data).status(200);
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        res.status(500).json({ error: "Erro ao buscar categorias." });
    }
  });

  router.get('/categoria/:id',
    async function (req, resp){
        try{
            let data = null;
            const categoria = await model.CategoriaProduto.schema('public');
            data = await categoria.findByPk(req.params.id);
            if(data == null){
                resp.status(404).json({error: "Categoria não encontrada."});
            }
            resp.json(data).status(200);
        } catch (error) {
            console.error("Erro ao buscar categoria:", error);
            resp.status(500).json({ error: "Erro ao buscar categoria." });
        }
});

router.put('/categoria/:id',
    async function (req, resp){
        try{
            let data = null;
            const categoria = await model.CategoriaProduto.schema('public');
            data = await categoria.update(req.body, {where: {id: req.params.id}});
            resp.json({detail: "Categoria atualizada com sucesso"}).status(200);
        } catch (error) {
            console.error("Erro ao atualizar categoria:", error);
            resp.status(500).json({ error: "Erro ao atualizar categoria." });
        }
});

router.delete('/categoria/:id',
    async function (req, resp){
        try{
            let data = null;
            const categoria = await model.CategoriaProduto.schema('public');
            data = await categoria.destroy({where: {id: req.params.id}});
            if(data == 0){
              resp.status(404).json({error: "Categoria não encontrada."});
            }else{
              resp.status(200).json({detail: "Categoria deletada"});
            }
        } catch (error) {
            console.error("Erro ao deletar categoria:", error);
            resp.status(500).json({ error: "Erro ao deletar categoria." });
        }
});

module.exports = router;