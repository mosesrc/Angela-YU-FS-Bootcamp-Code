import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  password: "learn",
  host: "localhost",
  database: "secrets",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const checkForUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [username]
    );

    if (checkForUser.rows.length > 0) {
      return res.status(400).send("User already exists");
    }

    await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      username,
      password,
    ]);
    res.render("secrets.ejs");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal Server Error - " + error.message);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const data = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);

    const user = data.rows[0];

    if (!user) {
      throw new Error("User does not exist!");
    }

    if (user.password !== password) {
      throw new Error("Incorrect password!");
    }

    res.render("secrets.ejs");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal Server Error - " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
