const router = require("express").Router();

const UsersController = require("../controller/UsersController");
const { authMiddleware } = require("../helpers/authMiddleware");

router.post("/save", UsersController.create);

router.post("/login", UsersController.login);

// Aplica o middleware de autenticação à rota GET
router.get("/", authMiddleware, UsersController.read);

module.exports = router;