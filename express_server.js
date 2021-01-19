const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

app.set("view engine", "ejs");


// Adding Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


// //
// app.post("/urls", (req, res) => {
//   console.log(req.body);  // Log the POST request body to the console
//   res.send("Ok");         // Respond with 'Ok' (we will replace this)
// });



// //  simple definition that logs the request body and gives a dummy response.
// app.post("/urls", (req, res) => {
//   console.log(req.body);  // Log the POST request body to the console
//   res.send("Ok");         // Respond with 'Ok' (we will replace this)
// });

app.post("/urls", (req, res) => {
  console.log(req.body); 
  const longUrl = req.body.longURL; // key I'm accessing....
  const shortUrl = generateRandomString();
  console.log(longUrl)
  console.log(shortUrl);
  urlDatabase[shortUrl] = longUrl
  console.log(urlDatabase);
   // Log the POST request body to the console
  //call generate URL func. -> save to a variable - > insert into a DB -> (the var as the key) ; value is [req.body.longURL] (entered value)
  //call function to gen short URL:
  // res.send("Ok");         // Respond with 'Ok' (we will replace this)
  res.redirect('/urls'); //new added line to redirect:
});



// Object to keep track of all the URLs and their shortened forms.
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};


// Add the following route to handle shortURL requests
app.get("/u/:shortURL", (req, res) => {
  console.log(req.params);
  const longURL = urlDatabase[req.params.shortURL]
  //console.log(longURL)
  res.redirect(longURL);
});



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


// DELETE /MEMES/:id 
// POST /memes/:id/delete

// post requests are used to CHANGE/DELETE/UPDATE/CREATE data 
app.post('/urls/:shortURL/delete', (req, res) => {
  const urlToDelete = req.params.shortURL;
  delete urlDatabase[urlToDelete];
  res.redirect('/urls');
})





//function to generate the random key
function generateRandomString() {
  let result = '';

  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let i = 6; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  console.log('test result: ', result)
  return result;
}
//length : returns 6 random alpha numeric characters

console.log(generateRandomString());