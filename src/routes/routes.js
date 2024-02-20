const express = require("express");
const user = require("../controllers/user");
const categories = require("../controllers/categories");
const product = require("../controllers/products");
const client = require("../controllers/clients");
const order = require("../controllers/orders");
const upload = require("../controllers/upload");
const verifyLogin = require("../middleware/auth");
const schemaUser = require("../schema/schemaUsers");
const schemaProducts = require("../schema/schemaProducts");
const schemaClients = require("../schema/schemaClients");
const schemaOrders = require("../schema/schemaOrders");
const validateReqBody = require("../middleware/validateReqBody");
const multer = require("../middleware/multer");

const route = express();

route.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello World!" });
});

route.get("/categorie", categories.listCategories);

route.post(
  "/user",
  validateReqBody(schemaUser.registerUser),
  user.registerUser
);
route.post("/login", validateReqBody(schemaUser.login), user.login);

route.use(verifyLogin);

route.get("/user", user.detailUserProfile);
route.put("/user", validateReqBody(schemaUser.editUser), user.editUserProfile);

route.post(
  "/product",
  validateReqBody(schemaProducts.registerAndEditProduct),
  product.registerProduct
);
route.put(
  "/product/:id",
  validateReqBody(schemaProducts.registerAndEditProduct),
  product.editProductData
);
route.get("/product", product.listProduct);
route.get("/product/:id", product.productDetail);
route.delete("/product/:id", product.deleteProduct);

route.post("/upload", multer.single("image"), upload.file);

route.post(
  "/client",
  validateReqBody(schemaClients.registerClient),
  client.registerClient
);
route.put(
  "/client/:id",
  validateReqBody(schemaClients.editClient),
  client.editClientData
);
route.get("/client", client.listClient);
route.get("/client/:id", client.detailClient);

route.post(
  "/order",
  validateReqBody(schemaOrders.registerOrder),
  order.registerOrder
);
route.get("/order", order.listOrder);

module.exports = route;
