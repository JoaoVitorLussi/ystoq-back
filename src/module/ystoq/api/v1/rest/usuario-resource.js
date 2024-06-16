const express = require('express');
const router = express.Router();
const model = require('../../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../../../../../..//middlewares/authMiddleware');

router.post('/usuario',
    async function (req, resp){
      const {nome, email, telefone, senha, nome_empresa, cnpj} = req.body;
       try{
          let usuarioExists = await model.Usuario.findOne({
            where: {
              email
            }
          });
      
          if (usuarioExists) {
            return resp.status(400).json({ error: "Já existe um usuário com esse email."});
          }

          let empresaExists = await model.Empresa.findOne({
            where: {
              cnpj: cnpj
            }
          });
      
          if (empresaExists) {
            return resp.status(400).json({ error: "Já existe um empresa com esse cnpj."});
          }

          const empresa = await model.Empresa.schema('public');
          let data_empresa = await empresa.create({nome: nome_empresa, cnpj: cnpj});
          
          let token = await bcrypt.hash(senha, 10);

          let data = null;
          const usuario = await model.Usuario.schema('public');
          data = await usuario.create({nome, email, telefone, senha: token, id_empresa: data_empresa.id});
          resp.json({detail: "Usuário criado com sucesso"}).status(201);
       }catch (error) {
          console.error("Erro ao criar administrador:", error);
          resp.status(500).json({ error: "Erro ao criar usuário." });
       }
});

router.get('/usuario', authMiddleware, async function (req, res) {
  try {
      let data = null;
      const usuario = await model.Usuario.schema('public');
      data = await usuario.findAll();
      res.json(data).status(200);
  } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).json({ error: "Erro ao buscar usuários." });
  }
});


router.get('/admin/:id',
    async function (req, resp){
        try{
            let data = null;
            const admin = await model.Usuario.schema('public');
            data = await admin.findByPk(req.params.id);
            if(data == null){
                resp.status(404).json({error: "Administrador não encontrado."});
            }
            resp.json(data).status(200);
        } catch (error) {
            console.error("Erro ao buscar administrador:", error);
            resp.status(500).json({ error: "Erro ao buscar administrador." });
        }
});

router.put('/admin/:id', authMiddleware,
    async function (req, resp){
        try{
            let data = null;
            const admin = await model.Admin.schema('public');
            data = await admin.update(req.body, {where: {id: req.params.id}});
            resp.json({detail: "Administrador editado com sucesso"}).status(200);
        } catch (error) {
            console.error("Erro ao atualizar administrador:", error);
            resp.status(500).json({ error: "Erro ao atualizar administrador." });
        }
});

router.delete('/usuario/:id', authMiddleware,
    async function (req, resp){
        try{
            const {id} = req.params;
            if(id == 1){
              resp.status(400).json({error: "Não é possível deletar o administrador principal."});
              return;
            }
            let data = null;
            const usuario = await model.Usuario.schema('public');
            data = await usuario.destroy({where: {id: id}});
            if(data == 0){
              resp.status(406).json({error: "Usuário não encontrado."});
            }else{
              resp.status(200).json({detail: "Usuário deletado"});
            }
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            resp.status(500).json({ error: "Erro ao deletar usuário." });
        }
});


module.exports = router;
