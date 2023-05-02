const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);

const { Serve } = require("h12");

//npx nodemon ./app.js
//nodemonConfig = { "ext": "js,css,html,json" }

//
app.use("/public", Serve(__dirname, "./public").Express);


//
app.use("/@hotreload", function(req, res) {

    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    //
    let _interval = setInterval(() => {
        res.write("Connected");
    }, 1000);

    //
    res.on("close", () => {
        console.log("Connection Closed");
        clearInterval(_interval);
        res.end();
    });

});


//
server.listen(process.env.PORT || 3000, () => {
    console.log("Server Started at port 3000");
    console.log("http://localhost:3000/");
});