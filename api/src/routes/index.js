const routes = require("express").Router();
const userController = require('../controllers/user');

routes.get(["/users"], userController.index)
routes.post("/users", userController.create)

module.exports = routes;