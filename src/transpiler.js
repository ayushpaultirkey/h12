const fs = require("fs");
const path = require("path");
const VComponent = require("./vcomponent");
//const terser = require("terser");

const Transpiler = {};


Transpiler.JIT = function(_string = "") {

    //Check if @Component is present
    if(!_string.includes("@Component")) {
        return _string;
    };

    //Remove @Component from string
    _string = _string.replace("@Component", "");

    //Replace dynamic tags from the file
    //<Button args /> will be replaced with h12c.Create(Button)
    const _match_tag = _string.matchAll(/<(\w+)\s+args(?:=|)(?:"(.*?)"|).*?\/>/gm);
    for(const _key of _match_tag) {

        _string = _string.replace(_key[0], `await h12c.Create(${_key[1]}${(typeof(_key[2]) == "undefined") ? ")" : `, ${_key[2]})`}`);

    };

    //Wrap the html string inside `` and also wrap
    //h12c.Create() function inside ${}
    const _match_return = _string.matchAll(/return.*?\(\[(.*?)\]\)/gms);
    for(const _key of _match_return) {

        //Check if the template have h12c.Create() function
        if(_key[1].includes("h12c.Create")) {

            //List having functions name
            let _list = [];

            //First select all h12c.Create() function then replace it with @[counter]
            const _match_function = _key[1].match(/(await\s+|)h12c\.Create\(.*?\)/gms);
            _match_function.forEach(x => {

                _key[1] = _key[1].replace(x, "${await @" + _list.length + "}");
                _list.push(x.replace(/await\s+/, ""));

            });

            //Then after that replace @[counter] with the previous function
            for(var i = 0, len = _list.length; i < len; i++) {
                _key[1] = _key[1].replace(`@${i}`, _list[i]);
            };

        };

        //Wrap template between ``
        _string = _string.replace(_key[0], "return `" + _key[1] + "`");

    };

    return _string;

};


Transpiler.JITPacked = function(_string = "") {
    
    //Check if @Component is present
    if(!_string.includes("@Component")) {
        return _string;
    };

    //
    const _vcomponent = new VComponent();
    _vcomponent.script = _string;
    _vcomponent.__build_template();
    _vcomponent.__build_binding();
    _vcomponent.__build_document();

    //
    return this.JIT(_vcomponent.__pack());

};


Transpiler.Build = function(_path = "") {

    //
    var _data = fs.readFileSync(path.join(__dirname, _path));
    _data = this.JITPacked(_data.toString());

};

module.exports = Transpiler;