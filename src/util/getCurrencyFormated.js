module.exports = (money) => new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
}).format(money);