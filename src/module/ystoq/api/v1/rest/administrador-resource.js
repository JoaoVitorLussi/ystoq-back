const express = require('express');
const router = express.Router();
const model = require('../../../model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/admin',
    async function (req, resp){
      const {nome, senha} = req.body;
       try{
          let adminExists = await model.Admin.findOne({
            where: {
              nome
            }
          });
      
          if (adminExists) {
            return resp.status(200).json({ error: "Já existe um administrador com esse nome de usuário."});
          }
          let token = await bcrypt.hash(senha, 10);

          let data = null;
          const Post = await model.Admin.schema('public');
          data = await Post.create({nome, senha: token});
          resp.json({detail: "Administrador criado com sucesso"}).status(201);
       }catch (error) {
          console.error("Erro ao criar administrador:", error);
          resp.status(500).json({ error: "Erro ao criar administrador." });
       }
});

router.get('/admin', async function (req, res) {
  try {
      let data = null;
      const Post = await model.Admin.schema('public');
      data = await Post.findAll();
      res.json(data).status(200);
  } catch (error) {
      console.error("Erro ao buscar administradores:", error);
      res.status(500).json({ error: "Erro ao buscar administradores." });
  }
});


router.get('/admin/:id',
    async function (req, resp){
        try{
            let data = null;
            const Post = await model.Admin.schema('public');
            data = await Post.findByPk(req.params.id);
            if(data == null){
                resp.status(404).json({error: "Administrador não encontrado."});
            }
            resp.json(data).status(200);
        } catch (error) {
            console.error("Erro ao buscar administrador:", error);
            resp.status(500).json({ error: "Erro ao buscar administrador." });
        }
});

router.put('/admin/:id',
    async function (req, resp){
        try{
            let data = null;
            const Post = await model.Admin.schema('public');
            data = await Post.update(req.body, {where: {id: req.params.id}});
            resp.json({detail: "Administrador editado com sucesso"}).status(200);
        } catch (error) {
            console.error("Erro ao atualizar administrador:", error);
            resp.status(500).json({ error: "Erro ao atualizar administrador." });
        }
});

router.delete('/admin/:id',
    async function (req, resp){
        try{
            let data = null;
            const Post = await model.Admin.schema('public');
            data = await Post.destroy({where: {id: req.params.id}});
            if(data == 0){
              resp.status(404).json({error: "Administrador não encontrado."});
            }else{
              resp.status(200).json({detail: "Adimistrador deletado"});
            }
        } catch (error) {
            console.error("Erro ao deletar administrador:", error);
            resp.status(500).json({ error: "Erro ao deletar administrador." });
        }
});

router.post('/login-admin',
    async function (req, resp){
       try{
          const {nome, senha} = req.body;
          let admin = await model.Admin.findOne({
            where: {
              nome
            }
          });

          if (!admin || !(await bcrypt.compare(senha, admin.senha))) {
            return resp.status(200).send({
              type: 'error',
              message: 'Usuário ou senha incorretos!'
            });
          }

          let token = jwt.sign(
            { adminId: admin.id, nome: admin.nome }, //payload - dados utilizados na criacao do token
            'AAAAAAAA', //chave PRIVADA da aplicação 
            { expiresIn: '1h' } //options ... em quanto tempo ele expira...
          );
      
          admin.token = token;
          await admin.save();
      
          return resp.status(200).send({
            type: 'sucess',
            message: 'Bem-vindo! Login realizado com sucesso!',
            data: admin,
            token
          });


       }catch (error) {
          console.error("Erro ao criar administrador:", error);
          resp.status(500).json({ error: "Erro ao criar administrador." });
       }
});


module.exports = router;
