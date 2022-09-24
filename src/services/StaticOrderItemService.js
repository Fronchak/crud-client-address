module.exports = getItemUpdateUrlPage = (orderItem) => {
  return `/orders/${orderItem.Order.id}/products/${orderItem.Product.id}/update`;
}

module.exports = getItemDeleteUrlPage = (orderItem) => {
  return `/orders/${orderItem.Order.id}/products/${orderItem.Product.id}/delete`;
}