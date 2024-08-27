import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render('index.ejs', { show: false, nameLength: null });
});

app.post("/submit", (req, res) => {
  const { fName, lName } = req.body;
  let nameLength = fName.trim().length + lName.trim().length;
  res.render('index.ejs', { show: true, nameLength})
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
