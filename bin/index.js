#!/usr/bin/env node
const Create = require("./create");

const _args = process.argv;

if(_args.indexOf("--create") !== -1) {
    Create();
}
else if(_args.indexOf("--help") !== -1) {
    _help();
}
else {
    _help();
};

function _help() {
    console.log("\x1b[32mH12 Command:");
    console.log("\x1b[34m--create\t=>\x1b[0m Create a new H12 project with library and transpiler");
};