const joi = require("joi");

const registerOrder = joi.object({
  client_id: joi.number().required(),
  observation: joi.string().optional(),
  order_products: joi
    .array()
    .items(
      joi.object({
        product_id: joi.number().required(),
        product_quantity: joi.number().required(),
      })
    )
    .required(),
});

module.exports = {
  registerOrder,
};
