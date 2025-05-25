import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "learn",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

let currentUserId = 1;
let users = [];

async function checkVisited() {
  const result = await db.query(
    "SELECT * FROM visited_countries WHERE user_id = $1",
    [currentUserId]
  );

  const countries = result.rows.map((row) => row.country_code);
  return countries;
}

async function getUsers() {
  users = [];
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => Number(user.id) === currentUserId);
}

app.get("/", async (req, res) => {
  const countries = await checkVisited();
  const currentUser = await getUsers();

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2) RETURNING *",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  try {
    if (req.body.add === "new") {
      return res.render("new.ejs");
    }

    currentUserId = Number(req.body.user);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: [],
      error: err.message,
      color: "teal",
    });
  }
});

app.post("/new", async (req, res) => {
  try {
    const result = await db.query(
      "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *",
      [req.body.name, req.body.color]
    );

    if (result.rows.length === 0) {
      throw new Error("No users found");
    }
    currentUserId = Number(result.rows[0].id);

    users.push(result.rows[0]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.render("new.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      error: err.message,
      color: "teal",
    });
  }
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
