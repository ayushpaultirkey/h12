const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const server = http.createServer(app);

const { Serve } = require("h12");


//
app.use("/public", Serve(path.join(__dirname, "./public")).Express);
app.use("/@h12", express.static("./public/library/h12"));

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