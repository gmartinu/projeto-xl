const routes = require("express").Router();
const controller = require('../controllers');

routes.get("/users", controller.users)
routes.get("/pushes", controller.pushesIndex)
routes.post("/pushes", controller.pushesCreate)

module.exports = routes;