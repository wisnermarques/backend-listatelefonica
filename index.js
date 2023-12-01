const express = require("express");
const cors = require("cors");

const PersonsRoutes = require("./routes/PersonsRoutes");
const UsersRoutes = require("./routes/UsersRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("build"));

// Public folder for images
app.use(express.static("public"));

app.use("/api/persons", PersonsRoutes);
app.use("/api/users", UsersRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

