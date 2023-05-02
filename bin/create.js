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
        console.log("H12: Success\y=> Project created, use 'npm start' to start the server.");
    }
    catch(ex) {
        console.log("H12: Error\t=> Unable to create H12 project.");
        console.log(ex);
    };


};

module.exports = Create;