const fs = require("fs");
const path = require("path");
//const VComponent = require("./vcomponent");
//const terser = require("terser");

const Transpiler = {};

Transpiler.JIT = function(_string = "") {

    console.log(_string)

    //Check if @Component is present
    if(_string.indexOf("@Component") == -1) {
        return _string;
    };

    //Remove @Component from string
    _string = _string.replace("@Component", "");

    //Match all dynamic tags
    const _match_tag = _string.matchAll(/<(\w+)\s+args(?:=|)(?:{{(.*?)}}|).*?\/>/gm);
    for(const _key of _match_tag) {

        let _argument = (typeof(_key[2]) == "undefined") ? ", {}" : `, {${_key[2]}}`;
        _string = _string.replace(_key[0], `(await h12c.Create(${_key[1]}${_argument}, this)).template`);

    };
    
    //Get all brackets that have markup tags
    const _match_bracket = _string.matchAll(/(\((?:[^)(]|\((?:[^)(]|\((?:[^)(]|\([^)(]*\))*\))*\))*\))/g);
    for(var _key of _match_bracket) {

        if(_key[1].indexOf("<") !== -1 && _key[1].indexOf[">"] !== -1) {

            //
            if(_key[1].indexOf("h12c.Create") !== -1) {

                const _match_function = _key[1].match(/\((await\s+|)h12c\.Create\(.*?\)\)\.template/gms);
                for(var i = 0, ilen = _match_function.length; i < ilen; i++) {

                    _string = _string.replace(_match_function[i], "${" + _match_function[i].replace("h12c", "-_-") + "}");

                };

                //
                _string = _string.replace(/-_-/g, "h12c");

            };

            //
            let _template = _key[1].replace("(", "");
            _string = _string.replace(_key[1], "`" + _template.substring(0, _template.length - 1) + "`");

        };
        
    };
    
    //Get all Component.Render() function
    if(_string.indexOf("Component.Render") !== -1) {

        const _match_render = _string.match(/Component.Render(\((?:[^)(]|\((?:[^)(]|\((?:[^)(]|\([^)(]*\))*\))*\))*\))/gms);
        for(var i = 0, ilen = _match_render.length; i < ilen; i++) {

            _string = _string.replace(_match_render[i], _match_render[i].replace(/this\)\)\.template/g, "this))"));

        };

    };
    
    //
    return _string;

};


Transpiler.JITPacked = function(_string = "") {
    
    //Check if @Component is present
    if(!_string.includes("@Component")) {
        return _string;
    };

    //
    /*
    const _vcomponent = new VComponent();
    _vcomponent.script = _string;
    _vcomponent.__build_template();
    _vcomponent.__build_binding();
    _vcomponent.__build_document();
    */

    //
    return this.JIT(_vcomponent.__pack());

};

module.exports = Transpiler;