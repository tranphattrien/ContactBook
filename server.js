const express = require("express");
const cors = require("cors");
const config = require("./app/config");
const setupContactRoutes = require("./app/routes/contact.routes");
const {BadRequestError} = require("./app/helpers/errors");

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
setupContactRoutes(app);
// Handle 4040 response
app.use((req, res, next) => {
    next(new BadRequestError(404, "Resource not found"));
});
// define error-handling middleware last, after other app.use() and rotues calls
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});