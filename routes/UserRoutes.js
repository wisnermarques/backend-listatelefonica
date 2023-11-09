const router = require("express").Router();

const { save, login, logout } = require('../controller/UserController')

router.post('/login', login)

router.get('/logout', logout)

router.post('/save', save)

module.exports = router;
