const enumTipoMovimentacao = Object.freeze({
  'entrada': 0,
  'saida': 1,

  //recebe um valor numérico e retorna a string correspondente ('entrada' ou 'saida').
  getStringFromValue(value) {
    return Object.keys(this).find(key => this[key] === value);
  },

  //recebe uma string ('entrada' ou 'saida') e retorna o valor numérico correspondente.
  getValueFromString(value) {
    return this[value];
  }

});

module.exports = enumTipoMovimentacao;