const knex = require("../connection/knex");

const registerClient = async (req, res) => {
  const { name, email, cpf, cep, street, number, district, city, state } =
    req.body;

  try {
    const client = await knex("clients")
      .insert({
        name,
        email,
        cpf,
        cep,
        street,
        number,
        district,
        city,
        state,
      })
      .returning("*");

    if (!client) {
      return res.status(400).json({ message: "Unable to register client." });
    }

    return res.status(200).json(client[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

const editClientData = async (req, res) => {
  const { id } = req.params;
  const { name, email, cpf, cep, street, number, district, city, state } =
    req.body;

  try {
    const client = await knex("clients").where({ id }).first();

    if (!client) {
      return res.status(404).json({ message: "Client not found." });
    }

    if (email) {
      const emailExists = await knex("clients")
        .where({ email })
        .whereNot({ id })
        .returning("*");

      if (emailExists.length > 0) {
        return res.status(400).json({ message: "E-mail already registered" });
      }
    }

    if (cpf) {
      const cpfExists = await knex("clients")
        .where({ cpf })
        .whereNot({ id })
        .returning("*");

      if (cpfExists.length > 0) {
        return res.status(400).json({ message: "CPF already registered" });
      }
    }

    const updatedClient = await knex("clients").where({ id }).update({
      name,
      email,
      cpf,
      cep,
      street,
      number,
      district,
      city,
      state,
    });

    if (!updatedClient) {
      return res.status(400).json({ message: "Unable to update client" });
    }

    return res.status(201).json({ message: "Successful update." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const listClient = async (req, res) => {
  try {
    const list = await knex("clients").orderBy("id", "asc");

    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const detailClient = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await knex("clients").where({ id }).first();

    if (!client) {
      return res.status(404).json({ message: "Client not found." });
    }

    return res.status(200).json(client);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerClient,
  editClientData,
  listClient,
  detailClient,
};
