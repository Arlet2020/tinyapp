const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

app.set("view engine", "ejs");


// Object to keep track of all the URLs and their shortened forms.
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// Add a GET Route to Show the Form
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});


// New route handler for "/urls and res.render()"
app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});


app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
res.render("urls_show", templateVars); // calling
  //console.log(req.params.shortURL)
  //console.log(urlDatabase[req.params.shortURL]);
});


app.get("/", (req, res) => {
  res.send("Hello!");
});

// 2 | Sending HTML
app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

// 1 | Adding additional endpoints,
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});