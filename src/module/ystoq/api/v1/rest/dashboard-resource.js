const express = require("express");
const router = express.Router();
const { Sequelize, QueryTypes } = require("sequelize");
const authMiddleware = require("../../../../../../middlewares/authMiddleware");

const sequelize = new Sequelize('ystoq', 'postgres', 'postgres', {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres',
  logging: false,
});

router.get("/dashboard-entrada-saida", authMiddleware, async function (req, resp) {
  try {
    const query = `WITH entrada AS (SELECT EXTRACT(MONTH FROM data) AS mes,
                        SUM(quantidade)          AS total_entrada
                 FROM movimentacao_estoque
                 WHERE tipo = 0
                 GROUP BY mes),
                    saida AS (SELECT EXTRACT(MONTH FROM data) AS mes,
                      SUM(quantidade)          AS total_saida
               FROM movimentacao_estoque
               WHERE tipo = 1
               GROUP BY mes),
            meses AS (SELECT generate_series(1, 12) AS mes)
        SELECT m.mes,
            COALESCE(e.total_entrada, 0) AS entrada,
            COALESCE(s.total_saida, 0)   AS saida
        FROM meses m
        LEFT JOIN entrada e ON m.mes = e.mes
        LEFT JOIN saida s ON m.mes = s.mes
            ORDER BY m.mes;`;
    const dados = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    resp.status(200).json(dados);
  } catch (error) {
    console.error("Erro ao executar a consulta:", error);
    resp.status(500).json({ error: "Erro ao buscar dados do banco de dados" });
  }
});

router.get("/dashboard-quantidade-estoque", authMiddleware, async function (req, resp) {
    try {
        let estoques;
        let dados;
        const query = `select e.descricao from estoque e  order by e.descricao;`;

        estoques = await sequelize.query(query, {
            type: QueryTypes.SELECT,
        });

        let sql = `WITH estoque_produto_cte AS (SELECT p.id                       AS id_produto,
                                    p.descricao                AS nome_produto,
                                    e.descricao                AS nome_estoque,
                                    COALESCE(ep.quantidade, 0) AS quantidade
                             FROM produto p
                                      CROSS JOIN estoque e
                                      LEFT JOIN estoque_produto ep ON ep.id_estoque = e.id AND ep.id_produto = p.id)
                    SELECT nome_produto                                AS name,
                    ARRAY_AGG(quantidade ORDER BY nome_estoque) AS data
                    FROM estoque_produto_cte
                    GROUP BY nome_produto
                    HAVING SUM(CASE WHEN quantidade > 0 THEN 1 ELSE 0 END) > 0
                    ORDER BY nome_produto;`

        dados = await sequelize.query(sql, {
            type: QueryTypes.SELECT,
            });

        resp.status(200).json({dados, estoques});
    } catch (error) {
      console.error("Erro ao executar a consulta estoques:", error);
      resp.status(500).json({ error: "Erro ao buscar dados do estoque" });
    }
  });

module.exports = router;
