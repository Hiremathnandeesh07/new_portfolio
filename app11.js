const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const port = 3000; // You can use any port you prefer

// PostgreSQL configuration
const pool = new Pool({
  user: "postgres",
  host: "portfolio.cdeoauo08byr.us-east-1.rds.amazonaws.com",
  database: "portfolio", //name od the databse you have created
  password: "postgrenandeesh",
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
app.get("/testing", (req, res) => {
  res.render("testing");
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
    const registeredUser = result.rows[0];
    // Redirect to login page
    res.render("testing", { user: registeredUser });
    // res.sendFile(
    //   "C:\\Users\\lenovo\\Desktop\\portfolio makert\\portfolio sample\\views\\testing.html"
    // );
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
      res.render("testing");
      // res.sendFile(
      //   "C:\\Users\\lenovo\\Desktop\\portfolio makert\\portfolio sample\\views\\testing.html"
      // );
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
// app.post("/submit", (req, res) => {
//   const formData = req.body;
//     console.log("Received form data:", formData);

//   // Render the EJS file with the extracted values
//   res.render("portfolio1.ejs", {
//     name: formData.name,
//     work: formData.work,
//     about: formData.about,
//     skills: formData.skills,
//     link0: formData.link0,
//     link1: formData.link1,
//     project_title0: formData.project_title0,
//     project_brief0: formData.project_brief0,
//     project_link0: formData.project_link0,

//     project_title1: formData.project_title1,
//     project_brief1: formData.project_brief1,
//     project_link1: formData.project_link1,

//     project_title2: formData.project_title2,
//     project_brief2: formData.project_brief2,
//     project_link2: formData.project_link2,
//   });
// });
app.post("/submit", async (req, res) => {
  const formData = req.body;

  // Update the user's information in the database
  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, work = $2, about = $3, skills = $4, links0 = $5, links1 = $6, project_title0 = $7, project_brief0 = $8, project_links0 = $9, project_title1 = $10, project_brief1 = $11, project_links1 = $12, project_title2 = $13, project_brief2 = $14, project_links2 = $15 RETURNING *",
      [
        formData.name,
        formData.work,
        formData.about,
        formData.skills,
        formData.links0,
        formData.links1,
        formData.project_title0,
        formData.project_brief0,
        formData.project_links0,
        formData.project_title1,
        formData.project_brief1,
        formData.project_links1,
        formData.project_title2,
        formData.project_brief2,
        formData.project_links2,
      ]
    );
    const updatedUser = result.rows[0];
    res.render("list_of_templets.ejs", { userId: result.rows[0].id });
    // Render the second registration page with updated information
    // res.render("portfolio1.ejs", {
    //   name: updatedUser.name,
    //   work: updatedUser.work,
    //   about: updatedUser.about,
    //   skills: updatedUser.skills,
    //   link0: updatedUser.links0,
    //   link1: updatedUser.links1,
    //   project_title0: updatedUser.project_title0,
    //   project_brief0: updatedUser.project_brief0,
    //   project_link0: updatedUser.project_link0,
    //   project_title1: updatedUser.project_title1,
    //   project_brief1: updatedUser.project_brief1,
    //   project_link1: updatedUser.project_link1,
    //   project_title2: updatedUser.project_title2,
    //   project_brief2: updatedUser.project_brief2,
    //   project_link2: updatedUser.project_link2,
    // });
  } catch (error) {
    console.error("Error updating user information in the database:", error);
    res.status(500).send("Internal Server Error");
  }
});
// app.js
app.post("/viewPortfolio", async (req, res) => {
  const userId = req.body.userId;
  const selectedTemplate = req.body.selectedTemplate || "portfolio1"; // Default to portfolio1 if not selected.
  console.log(req.body.selectedTemplate);
  try {
    // Retrieve user information from the database based on userId
    const user = await getUserInfoById(userId);

    // Render the selected portfolio EJS file with user information
    res.render(`${selectedTemplate}.ejs`, {
      name: user.name,
      work: user.work,
      about: user.about,
      skills: user.skills,
      link0: user.links0,
      link1: user.links1,
      project_title0: user.project_title0,
      project_brief0: user.project_brief0,
      project_link0: user.project_link0,
      project_title1: user.project_title1,
      project_brief1: user.project_brief1,
      project_link1: user.project_link1,
      project_title2: user.project_title2,
      project_brief2: user.project_brief2,
      project_link2: user.project_link2,
    });
  } catch (error) {
    console.error("Error retrieving user information:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Assume you have a function to retrieve user information by ID
async function getUserInfoById(userId) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);
  return result.rows[0];
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
