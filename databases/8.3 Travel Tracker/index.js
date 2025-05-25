import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  password: "learn",
  host: "localhost",
  database: "world",
  port: 5432,
});
db.connect();

let countries = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const result = await db.query("SELECT country_code FROM visited_countries");
  countries = result.rows.map((row) => row.country_code);
  res.render("index.ejs", { total: countries.length,
    error: false,
    countries });
});

app.post("/add", async (req, res) => {
  const inputCountry = req.body.country.toLowerCase().trim();

  const result = await db.query(
    "select * from countries where lower(country_name) like '%' || $1 || '%'",
    [inputCountry]
  );

  if (result.rows.length === 0) {
    return res.render("index.ejs", {
      error: "Country does not exist, try again",
      total: countries.length,
      countries
    });
  }
  const { country_code } = result.rows[0];

  try {
    await db.query(
      `insert into visited_countries (country_code) values ('${country_code}')`
    );
  } catch (error) {
    return res.render("index.ejs", {
      error: "Country has already been added, try again",
      total: countries.length,
      countries
    });
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
