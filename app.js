const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const port = 5000; // You can use any port you prefer

// PostgreSQL configuration
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "portfolio",
  password: "postgreNn@",
  port: 5432,
});

// Set up EJS as the view engine
app.use(express.static("public"));
app.set("view engine", "ejs");

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML file with the form
// app.get("/", (req, res) => {
//   res.sendFile(
//     "C:\\Users\\lenovo\\Desktop\\portfolio makert\\portfolio sample\\testing.html"
//   );
// });

app.get("/", (req, res) => {
  res.render("mainhome");
});

app.get("/register", (req, res) => {
  res.render("register");
});

// Handling registration form submission
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Insert user data into the database
    const result = await pool.query(
      "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
      [email, password]
    );

    // Redirect to login page
    // res.render("/testing");
    res.sendFile(
      "C:\\Users\\lenovo\\Desktop\\portfolio makert\\portfolio sample\\views\\testing.html"
    );
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

// Handling login form submission
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );
    consolr.log(result);
    if (result.rows.length > 0) {
      // User exists, redirect to main page
      // res.render("/testing");
      res.sendFile(
        "C:\\Users\\lenovo\\Desktop\\portfolio makert\\portfolio sample\\views\\testing.html"
      );
    } else {
      // User not found, redirect to registration page
      res.redirect("/register");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Handle form submission
app.post("/submit", (req, res) => {
  const formData = req.body;
  console.log("Received form data:", formData);

  // Render the EJS file with the extracted values
  res.render("portfolio1.ejs", {
    name: formData.name,
    work: formData.work,
    about: formData.about,
    skills: formData.skills,
    link0: formData.link0,
    link1: formData.link1,
    project_title0: formData.project_title0,
    project_brief0: formData.project_brief0,
    project_link0: formData.project_link0,

    project_title1: formData.project_title1,
    project_brief1: formData.project_brief1,
    project_link1: formData.project_link1,

    project_title2: formData.project_title2,
    project_brief2: formData.project_brief2,
    project_link2: formData.project_link2,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
