//Get module path of the project
const fs = require("fs");
const path = require("path");
const fsExtra = require("fs-extra");


function Create() {

    //
    const _module = require.resolve("express");
    const _path = _module.split("node_modules");

    //
    const _root = (typeof(_path) !== "undefined" && _path.length > 0) ? ((path.extname(_path[0]) == "") ? _path[0] : "" ) : "";

    //
    if(_root == "") {
        console.log("H12: Error\t=> Unable to get the root folder of the project.");
        return 0;
    };

    //
    try {
        fsExtra.copySync(path.join(__dirname, "./../template"), _root);

        const _package = fs.readFileSync(path.join(_root, "package.json"));
        const _json = JSON.parse(_package.toString());

        //
        if(typeof(_json.scripts) == "undefined") {
            _json.scripts = {};
        };

        //
        if(typeof(_json.scripts.start) !== "undefined") {
            _json.scripts.start_old = _json.scripts.start;
        };
        _json.scripts.start = "npx nodemon ./app.js";

        //
        if(typeof(_json.nodemonConfig) == "undefined") {
            _json.nodemonConfig = {};
        };
        _json.nodemonConfig.ext = "js,css,html,json";

        //
        fs.writeFileSync(path.join(_root, "package.json"), JSON.stringify(_json));

        //
        console.log("H12: Success\y=> Project created, use 'npm start' to start the server.");
    }
    catch(ex) {
        console.log("H12: Error\t=> Unable to create H12 project.");
        console.log(ex);
    };


};

module.exports = Create;