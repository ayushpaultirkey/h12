const fs = require("fs");
const path = require("path");
const mime = require("mime");
const Transpiler = require("./transpiler");

//
function Serve(_path = "", _config = { packed: false, hotreload: true }) {
    return {
        Express: function(_req, _res) {
            __express(_req, _res, _path, _config);
        }
    };
};

//
const __express = (request, response, _path, _config = { packed: false, hotreload: true }) => {

    //Get url and remove /@ from baseurl and check if url is file
    const _url = path.join(_path, request.url);
    const _extension = path.extname(_url);
    const _exist = fs.existsSync(_url);

    if(_exist && _extension.length > 0) {

        //
        let _data = fs.readFileSync(_url);

        //
        if(_extension.toLowerCase() == ".js") {

            if(typeof(_config.packed) !== "undefined" && _config.packed) {
                _data = Transpiler.JITPacked(_data.toString());
            }
            else {
                _data = Transpiler.JIT(_data.toString());
            };

        };

        if(typeof(_config.hotreload) !== "undefined" && _config.hotreload) {
            if(_extension.toLowerCase() == ".html") {
                _data = _data.toString();
                _data += `<script src="/@h12/hotreload.js"></script>`;
            };
        };

        //
        const _content_type = mime.getType(_url);
        response.contentType((_content_type == null) ? "text/plain" : _content_type);
        response.send(_data);

    }
    else {
        response.sendStatus(404);
    };

};

module.exports = Serve;