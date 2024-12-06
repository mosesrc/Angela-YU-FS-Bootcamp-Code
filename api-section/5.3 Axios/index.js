import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const { type, participants } = req.body;
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}`);
    const result = response.data[0];
    console.log(result);
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("No activities that match your criteria.", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});



app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
