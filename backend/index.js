const bodyParser = require("body-parser");
const express = require("express")
const app = express()
const db = require("./config/db")
const consign = require("consign")

consign()
    .include("./config/passport.js")
    .then("./config/middlewares.js")
    .then("./api")
    .then("./config/routes.js")
    .into(app)

console.log("Modules loaded...");

app.db = db;

console.log("Db loaded...");

// app.use(myJson());
// app.use(bodyParser.json());

// function myJson(){
//     return (req, res, next) => {
//         console.log("First one: My middlewere...");
//         next();
//     }
// }

// app.get("/test/:value", (req, res, next) => {
//     console.log("func 0");
//     next();
// }) 

// app.post("/test/:value", (req, res, next) => {
//     console.log("func 1");
//     // res.status(200).send("My backend = " + JSON.stringify(req.body));
//     res.status(200).send("My backend = " + req.body.dependencies[0].name);
//     // next();
// }) 

// app.get("/test/:value", (req, res) => {
//     console.log("func 2");
// }) 

app.listen(3000, "0.0.0.0", () => {
    console.log("Backend executing...");
})