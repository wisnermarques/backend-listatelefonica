const jwt = require('jsonwebtoken')
const conn = require('../db/conn')

function authMiddleware(req, res, next) {
  // Verifica se o header 'Authorization' está presente na requisição
  const token = req.headers['authorization']

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Token de autenticação não fornecido' })
  }

  // Verifica se o token é válido
  jwt.verify(token.split(' ')[1], 'Meu segredo', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' })
    }

    // Verifica se o usuário existe no banco de dados
    conn('tab_users')
      .first()
      .where({ id: decoded.id }) // Supondo que o token contenha o ID do usuário
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: 'Usuário não encontrado' })
        }

        // Se o usuário for encontrado, você pode prosseguir para a próxima função middleware ou rota
        req.user = user // Armazena informações do usuário na requisição
        next()
      })
      .catch((error) => {
        console.error('Erro ao verificar usuário:', error)
        return res.status(500).json({ message: 'Erro interno do servidor' })
      })
  })
}

module.exports = authMiddleware
