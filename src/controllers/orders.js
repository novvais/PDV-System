const knex = require("../connection/knex");
const send = require("../connection/nodemailer");

const registerOrder = async (req, res) => {
  const { client_id, observation, order_products } = req.body;

  try {
    const locateClienteById = await knex("clients")
      .where({ id: client_id })
      .first();

    if (!locateClienteById) {
      return res
        .status(400)
        .json({ mensagem: "The customer ID was not found." });
    }

    const productsForRegistration = [];

    let totalValue = 0;

    for (const orderProducts of order_products) {
      const { product_id, product_quantity } = orderProducts;

      const existingProduct = await knex("products")
        .where({ id: product_id })
        .first();

      if (!existingProduct) {
        return res
          .status(404)
          .json({ message: `Product with ID ${product_id} not found.` });
      }

      if (product_quantity > existingProduct.stock_quantity) {
        return res.status(400).json({
          message: `Insufficient stock quantity for product with ID ${product_id}.`,
        });
      }

      let valueProduct = await knex("products")
        .select("value")
        .where({ id: product_id })
        .first();

      totalValue += valueProduct.value;

      productsForRegistration.push({
        product_id,
        product_quantity,
        product_value: valueProduct,
      });
    }

    const trx = await knex.transaction();

    try {
      const order = await trx("orders")
        .insert({
          client_id,
          observation,
          total_value: totalValue,
        })
        .returning("*");

      await trx("order_products").insert(
        productsForRegistration.map((productsRegistration) => ({
          order_id: order[0].id,
          product_id: productsRegistration.product_id,
          product_quantity: productsRegistration.product_quantity,
          product_value: productsRegistration.product_value.value,
        }))
      );

      await trx.commit();

      const subject = "Order Confirmation";
      const body =
        "Thank you for placing your order with us. Your order has been successfully registered!";
      send(locateClienteById.email, subject, body);

      return res.status(200).json({});
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const listOrder = async (req, res) => {
  const { client_id } = req.query;
  try {
    let orders;

    if (client_id) {
      orders = await knex("orders").where("client_id", client_id).select("*");
    } else {
      orders = await knex("orders").select("*");
    }

    for (const order of orders) {
      const products = await knex("order_products")
        .where("order_id", order.id)
        .select("*");

      order.products = products.map(
        ({ id, product_quantity, product_value, order_id, product_id }) => ({
          id,
          product_quantity,
          product_value,
          order_id,
          product_id,
        })
      );
    }

    const returnOfOrders = orders.map(
      ({ id, total_value, observation, client_id, products }) => ({
        order: { id, total_value, observation, client_id },
        order_products: products,
      })
    );

    return res.status(200).json(returnOfOrders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerOrder,
  listOrder,
};
