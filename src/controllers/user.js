const knex = require("../connection/knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const emailExists = await knex("users").where({ email }).first();

    if (emailExists) {
      return res.status(400).json({ message: "E-mail already registered" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await knex("users")
      .insert({
        name,
        email,
        password: encryptedPassword,
      })
      .returning("*");

    if (!user) {
      return res.status(400).json({ message: "Unable to register user." });
    }

    return res.status(200).json({ message: "User successfully registered!" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await knex("users").where({ email }).first();

    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid email and/or password." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Invalid username and/or password." });
    }

    const token = jwt.sign({ id: user.id }, process.env.JW_SECRET, {
      expiresIn: "8h",
    });

    const { password: _, ...loginUser } = user;

    return res.status(200).json({ ...loginUser, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const detailUserProfile = async (req, res) => {
  const id = req.usuario.id;

  try {
    const user = await knex("users").where({ id }).first();

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res
      .status(200)
      .json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const editUserProfile = async (req, res) => {
  const id = req.usuario.id;
  const { name, email, password } = req.body;

  try {
    if (email) {
      const emailExists = await knex("users")
        .where({ email })
        .whereNot({ id })
        .first();

      if (emailExists && emailExists !== req.user.email) {
        return res.status(400).json({ message: "E-mail already registered" });
      }
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await knex("users").where({ id }).update({
      name,
      email,
      password: encryptedPassword,
    });

    if (!updatedUser) {
      return res.status(400).json({ message: "Unable to update user" });
    }

    return res.status(201).json({ message: "Successful update." });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  registerUser,
  login,
  detailUserProfile,
  editUserProfile,
};
