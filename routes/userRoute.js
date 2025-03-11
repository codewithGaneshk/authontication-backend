const { getUser, postUser,login } = require("../controller/userController")
const routes = require("express").Router()

routes.get("/", getUser)
routes.post("/", postUser)
routes.post("/login",login)

module.exports = routes






