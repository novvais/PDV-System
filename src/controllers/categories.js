const knex = require("../connection/knex");

const listCategories = async (req, res) => {
  try {
    const list = await knex("categories");

    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listCategories,
};
