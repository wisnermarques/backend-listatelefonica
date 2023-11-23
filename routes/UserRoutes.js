const router = require('express').Router()

const { save, login, read } = require('../controller/UserController')

const jwt = require('jsonwebtoken');
const authMiddleware = require('../helpers/authMiddleware');

router.get('/', authMiddleware, read)

router.post('/login', login)

router.post('/save', save)

module.exports = router
