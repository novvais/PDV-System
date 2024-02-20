const joi = require("joi");

const registerAndEditProduct = joi.object({
  description: joi.string().required().messages({
    "any.required": "The description field is require.",
  }),
  stock_quantity: joi.number().required().messages({
    "any.required": "The quantity of stock field is require.",
  }),
  value: joi.number().required().messages({
    "any.required": "The value field is require.",
  }),
  categorie_id: joi.number().required().messages({
    "any.required": "The category field is require.",
  }),
  product_image: joi.string().optional(),
});

module.exports = {
  registerAndEditProduct,
};
