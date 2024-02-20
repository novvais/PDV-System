const joi = require("joi");

const registerClient = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  cpf: joi
    .string()
    .regex(/^\d{11}$/)
    .required(),
  cep: joi.string().regex(/^\d{8}$/),
  street: joi.string(),
  number: joi.string(),
  district: joi.string(),
  city: joi.string(),
  state: joi.string(),
});

const editClient = joi.object({
  nome: joi.string().optional(),
  email: joi.string().email().optional(),
  cpf: joi
    .string()
    .regex(/^\d{11}$/)
    .optional(),
  cep: joi
    .string()
    .regex(/^\d{8}$/)
    .optional(),
  street: joi.string().optional(),
  number: joi.string().optional(),
  district: joi.string().optional(),
  city: joi.string().optional(),
  state: joi.string().optional(),
});

module.exports = {
  registerClient,
  editClient,
};
