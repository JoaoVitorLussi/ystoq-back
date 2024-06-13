const express = require('express');
const router = express.Router();
const model = require('../../../model');

router.get('/estoque',
    async function (req, resp){
        try{
            let data = null;
            const estoque = await model.Estoque.schema('public');
            data = await estoque.findAll();
            if(data == null){
                resp.status(404).json({error: "Nenhum estoque encontrado."});
            }
            resp.json(data).status(200);
        } catch (error) {
            console.error("Erro ao buscar estoque:", error);
            resp.status(500).json({ error: "Erro ao buscar estoque." });
        }
});

module.exports = router;