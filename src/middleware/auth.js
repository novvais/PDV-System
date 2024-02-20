const knex = require("../connection/knex");
const jwt = require("jsonwebtoken");

const checkLoggedUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Not authorized." });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.JW_SECRET);

    const user = await knex("users").where({ id }).first();

    if (!user) {
      return res.status(401).json({ message: "Not authorized." });
    }

    req.usuario = user;

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = checkLoggedUser;
