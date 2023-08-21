const express = require("express");
const cors = require("cors");
const PORT = 8000;
const app = express();

app.use(express.json());

app.use(cors());
const corsOptions = {
  origin: "http://localhost:3000",
};

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
