const express = require('express');
const router = express.Router();
const model = require('../../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
  
router.post('/login', async function (req, res) {
    try {
      let { nome, senha } = req.body;
  
      let user = await model.Admin.findOne({
        where: {
          nome
        }
      });
  
      if (!user || !(await bcrypt.compare(nome, user.passwordHash))) {
        return res.status(200).send({
          type: 'error',
          message: 'Usuário ou senha incorretos!'
        });
      }
  
      let token = jwt.sign(
        { userId: user.id, username: user.username, role: user.role }, //payload - dados utilizados na criacao do token
        process.env.TOKEN_KEY, //chave PRIVADA da aplicação 
        { expiresIn: '1h' } //options ... em quanto tempo ele expira...
      );
  
      user.token = token;
      await user.save();
  
      return res.status(200).send({
        type: 'sucess',
        message: 'Bem-vindo! Login realizado com sucesso!',
        data: user,
        token
      });
    } catch (error) {
      return res.status(200).send({
        type: 'error',
        message: 'Ops! Ocorreu um erro!',
        data: error
      });
    }
});



module.exports = router;
