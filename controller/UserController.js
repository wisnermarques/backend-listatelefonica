const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const conn = require('../db/conn')

function login(req, res) {
  const { email, senha } = req.body
  conn('tab_users')
    .first()
    .where({ email: email })
    .then((user) => {
      if (user != undefined) {
        const correct = bcrypt.compareSync(senha, user.senha)
        if (correct) {
          const userForToken = {
            email: user.email,
            id: user.id,
          }

          // o token expira em uma hora (60*60 segundos)
          const token = jwt.sign(userForToken, 'Meu segredo', {
            //process.env.SECRET
            expiresIn: 60 * 60,
          })
          const dataUser = {
            id: user.id,
            nome: user.nome,
            email: user.email,
          }
          res.send({ token, dataUser })
        } else {
          res.status(401).json({ err: 'Usuário ou senha incorreto' })
        }
      } else {
        res.status(401).json({ err: 'Usuário ou senha incorreto' })
      }
    })
}

function save(req, res) {
  const { nome, email, senha } = req.body

  conn('tab_users')
    .first()
    .where({ email: email })
    .then((user) => {
      if (user === undefined) {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(senha, salt)

        conn('tab_users')
          .insert({
            nome,
            email,
            senha: hash,
          })
          .then(() => res.json({ msg: 'Usuário cadastrado com sucesso!' }))
          .catch((err) =>
            res.json({ error: 'Houve um erro ao cadastrar o usuário:' + err })
          )
      } else {
        res.json({ msg: 'Usuário já existe!' })
      }
    })
}

function read(req, res) {
  conn('tab_users')
    .select('id', 'nome', 'email')
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) =>
      res.json({ error: 'Houve um erro ao cadastrar o usuário:' + err })
    )
}

module.exports = { save, login, read }
