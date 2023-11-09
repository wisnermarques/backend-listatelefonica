const router = require("express").Router();

const { save, login } = require('../controller/UserController')

router.post('/login', login)

router.post('/save', save)

module.exports = router;
