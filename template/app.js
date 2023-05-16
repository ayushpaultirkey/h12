const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const server = http.createServer(app);

//const { Serve } = require("h12");
const { Serve } = require("./../index");

app.use("/public", Serve(path.join(__dirname, "./public")).Express);
app.use("/@h12", express.static(path.join(__dirname, "./public/library/h12")));

app.use("/@hotreload", function(req, res) {

    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    let _interval = setInterval(() => { res.write("Connected"); }, 250);

    res.on("close", () => {
        clearInterval(_interval);
        res.end();
    });

});

server.listen(3000, () => {
    console.log("\x1b[34mH12 Server\t=>\x1b[0m Server started at port 3000");
    console.log("\x1b[34mH12 Server\t=>\x1b[36m http://localhost:3000/public/index.html");
});