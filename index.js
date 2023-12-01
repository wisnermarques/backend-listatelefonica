const express = require("express");
const cors = require("cors");
const PersonsRoutes = require("./routes/PersonsRoutes");
const UsersRoutes = require("./routes/UsersRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Serve arquivos estáticos a partir da pasta 'build'
app.use(express.static("build"));

// Pasta pública para imagens
// app.use(express.static("public"));

// Rotas para Persons e Users
app.use("/api/persons", PersonsRoutes);
app.use("/api/users", UsersRoutes);

// Tratamento de erros para rotas não encontradas
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
