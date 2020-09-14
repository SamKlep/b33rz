const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const request = require("request");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

function call_api(finishedAPI) {
  request(
    "https://api.punkapi.com/v2/beers",
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }

      if (res.statusCode === 200) {
        console.log(body);
        finishedAPI(body);
      }
    }
  );
}

// Set Handlebars Middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Set handlebar index GET routes
app.get("/", function (req, res) {
  call_api(function (doneAPI) {
    res.render("home", {
      b33rz: doneAPI,
    });
  });
});

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Server Listening on port ${PORT}`));
