const db = require('../../../../config/databases');
module.exports = {
    development: {
        ...db.ystoq
    },
    homolog: {
        ...db.ystoq
    },
    production: {
        ...db.ystoq
    },
}