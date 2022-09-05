const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("App connected")
})

const port = process.env.PORT || 5000;
app.listen(port)

console.log(`App running on ${port}`);