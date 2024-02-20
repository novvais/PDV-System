const knex = require("../connection/knex");
const storage = require("../storage");

const registerProduct = async (req, res) => {
  const { description, stock_quantity, value, categorie_id, product_image } =
    req.body;

  try {
    const existingCategory = await knex("categories")
      .where({ id: categorie_id })
      .first();

    if (existingCategory === undefined) {
      return res
        .status(500)
        .json({ message: "The category indicated does not exist" });
    }

    const newProduct = {
      description,
      stock_quantity,
      value,
      categorie_id,
      product_image,
    };

    const productId = await knex("products").insert(newProduct).returning("*");

    return res.status(201).json(productId[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editProductData = async (req, res) => {
  const { id } = req.params;
  const { description, stock_quantity, value, categorie_id, product_image } =
    req.body;

  try {
    const product = await knex("products").where({ id }).first();

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const categoriesId = await knex("categories")
      .where({ id: categorie_id })
      .first();

    if (!categoriesId) {
      return res
        .status(404)
        .json({ message: "Reported category does not exist." });
    }

    const data = {
      description,
      stock_quantity,
      value,
      categorie_id,
      product_image,
    };

    const updatedProduct = await knex("products")
      .update(data)
      .where({ id })
      .returning("*");

    if (!updatedProduct) {
      return res.status(400).json({ message: "Product cannot be updated" });
    }

    return res.status(201).json({ message: "Successful update." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const listProduct = async (req, res) => {
  const { categorie_id } = req.query;

  try {
    if (!categorie_id) {
      const products = await knex("products");
      return res.status(200).json(products);
    }

    const categoriesId = await knex("categories")
      .where({ id: `${categorie_id}` })
      .first();

    if (!categoriesId) {
      return res
        .status(404)
        .json({ message: "Reported category does not exist." });
    }

    if (categoriesId) {
      const productsFilter = await knex("products").where({
        categorie_id: `${categorie_id}`,
      });
      return res.status(200).json(productsFilter);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const productDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await knex("products").where({ id }).first();

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await knex("products").where({ id }).first();

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const productOnOrder = await knex("order_products")
      .where({ product_id: id })
      .first();

    if (productOnOrder) {
      return res.status(409).json({ message: "product cannot be deleted" });
    }

    const imgPathQueryResult = await knex("products")
      .where({ id })
      .select("product_image");

    const imgPath =
      imgPathQueryResult.length > 0
        ? imgPathQueryResult[0].product_image
        : null;

    if (imgPath) {
      const keyProductImage = imgPath.split(".com/");
      await storage.deleteF(keyProductImage[1]);
    }

    await knex("products").del().where({ id });

    return res.json({ message: "Product successfully deleted!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerProduct,
  editProductData,
  listProduct,
  productDetail,
  deleteProduct,
};
