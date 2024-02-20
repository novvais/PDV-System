const joi = require("joi");

const registerUser = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const editUser = joi.object({
  name: joi.string().optional(),
  email: joi.string().email().optional(),
  password: joi.string().min(6).optional(),
});

module.exports = {
  registerUser,
  login,
  editUser,
};
