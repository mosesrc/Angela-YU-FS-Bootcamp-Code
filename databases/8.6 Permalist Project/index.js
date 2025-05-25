import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

let items = [];

const db = new pg.Client({
  user: "postgres",
  password: "learn",
  host: "localhost",
  database: "angelayu_postgresql_section",
  port: 5432,
});

db.connect();

const init = async () => {
  const result = await db.query("SELECT * FROM items ORDER BY id ASC");
  const data = result.rows;
  items.push(...data);
};

app.get("/", async (req, res) => {
  items.length = 0; // Clear the items array
  await init();

const date = new Date(Date.now());
const formatted = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric"
}).format(date);

  res.render("index.ejs", {
    listTitle: "Today - " + formatted,
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  if (!item) {
    throw new Error("Item title is required");
  }

  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
    res.redirect("/");
  } catch (error) {
    console.error("Error adding item:", error.message);
    return res.status(400).send("Item title is required");
  }
});

app.post("/edit", async (req, res) => {
  const { updatedItemId, updatedItemTitle } = req.body;
  try {
    await db.query("UPDATE items SET title = $1 WHERE id = $2", [
      updatedItemTitle,
      updatedItemId,
    ]);
    res.redirect("/");
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).send("Error updating item");
  }
});

app.post("/delete", async (req, res) => {
  const { deleteItemId } = req.body;
  try {
    await db.query("DELETE FROM items WHERE id = $1", [deleteItemId]);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).send("Error deleting item");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
