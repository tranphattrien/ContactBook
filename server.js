const express = require("express");
const cors = require("cors");
const config = require("./app/config");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form urlencoded
app.use(express.urlencoded({extended: true}));

// simple roule
app.get("/", (req, res) => {
    res.json({message: "Welcome to contact book application."});
})
// Set port, listen for requests
const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`Server is running on port $(PORT).`);
})