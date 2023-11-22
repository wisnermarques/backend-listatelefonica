const router = require("express").Router();

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Verifica se o header 'Authorization' está presente na requisição
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  // Verifica se o token é válido
  jwt.verify(token, 'Meu Segredo', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    // Se o token for válido, você pode armazenar o usuário autenticado nos dados da requisição
    req.user = decoded.user; // Supondo que o token contenha informações do usuário

    // Chama a próxima função middleware ou a rota, pois o usuário está autenticado
    next();
  });
};


const UsersController = require("../controller/UsersController");

router.post("/", UsersController.create);

router.post("/login", UsersController.login);

// Aplica o middleware de autenticação à rota GET
router.get("/", authMiddleware, UsersController.read);

module.exports = router;