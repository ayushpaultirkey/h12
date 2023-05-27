const fs = require("fs");
const path = require("path");
const jsdom = require("jsdom");

const Transpiler = {};

Transpiler.JIT = function(_string = "") {

    //Check if @Component is present
    if(_string.indexOf("@Component") == -1) {
        return _string;
    };

    //Remove @Component from string
    _string = _string.replace("@Component", "");

    //Match all dynamic tags
    const _match_tag = _string.matchAll(/<(\w+)\s+args(?:=|)(?:{{(.*?)}}|).*?\/>/gm);
    for(const _key of _match_tag) {

        let _scope = "";
        let _match_scope = _key[0].matchAll(/scope(?:=|)(?:{(.*?)}|)/gm);
        for(const _skey of _match_scope) {
            if(typeof(_skey[1]) !== "undefined" && _skey[1].length > 0) {
                _scope = _skey[1].replace(/"/g, "'");
                break;
            };
        };

        _string = _string.replace(_key[0], `<${_key[1]} hx-app="${_key[1]}" scope="${_scope}" args="{${((typeof(_key[2]) !== "undefined")) ? _key[2].replace(/"/g, "'") : ""}}"></${_key[1]}>`);
        
    };


    //Match all template
    const _match_bracket = _string.matchAll(/<>(.*?)<\/>/gs);
    for(const _key of _match_bracket) {
    
        //Match all property
        const _match_prop = _key[1].matchAll(/{.*?}/gm);
        for(const _pkey of _match_prop) {

            if(_pkey[0].indexOf("...") !== -1) {
                _key[1] = _key[1].replace(_pkey[0], `"${_pkey[0].replace("}", "o-o")}"`);
            };

        };
        _key[1] = _key[1].replace(/o\-o/g, "}");

        //
        let _dom = new jsdom.JSDOM(_key[1]);
        let _transpiled = this.DOMConstruct(_dom.window.document.body.children[0]);
        _string = _string.replace(_key[0], _transpiled);
    
    };

    //Match all dynamic tags
    const _match_dyn = _string.matchAll(/<(\w+).*?args(?:=|)(?:.{(.*?)}.|)>.*?<\/\w+>/gm);
    for(const _key of _match_dyn) {
    
        let _dom = new jsdom.JSDOM(_key[0]);
        _string = _string.replace(_key[0], this.DOMConstruct(_dom.window.document.body.children[0]));
        //_string = _string.replace(_key[0], `await this._cx(${_key[1]}${((_key[2].length > 0) ? `, {${_key[2]}}` : "")})`);
    
    };

    //Get all Render() function
    if(_string.indexOf("Render") !== -1) {

        const _match_render = _string.match(/Render(\((?:[^)(]|\((?:[^)(]|\((?:[^)(]|\([^)(]*\))*\))*\))*\))/gms);
        for(var i = 0, ilen = _match_render.length; i < ilen; i++) {

            _string = _string.replace(_match_render[i], _match_render[i].replace(/await\s+this\._cx\(/g, "").replace(")", ""));

        };

    };

    
    //
    return _string;

};


Transpiler.DOMConstruct = function(_element = document.body) {

    let _children = _element.children;
    let _child = _element.childNodes;
    let _child_code = "";

    let _args = "";
    let _scope = "";
    let _component = false;
    let _name = "";

    let _attribute_value = "{";
    let _attribute = _element.getAttributeNames();
    _attribute.forEach(x => {
        let _value = _element.getAttribute(x);

        if(_value.indexOf("...") !== -1) {
            _attribute_value += `"${x}":${_element.getAttribute(x)},`;
        }
        else {
            if(x == "hx-app") {
                _component = true;
                _name = _element.getAttribute(x);
                _args = _element.getAttribute("args");
                _scope = _element.getAttribute("scope").replace(/ /g, "");
            }
            else {
                _attribute_value += `"${x}":"${_element.getAttribute(x)}",`;
            }
        };
        
    });
    _attribute_value += "}";
    _attribute_value = _attribute_value.replace(",}", "}");
    _attribute_value = ((_attribute_value == "{}") ? "" : "," + _attribute_value);

    if(_component) {
        return `await ${_scope.length == 0 ? "this" : _scope}._cx(${_name},${_args})`.replace(/,\]/g, "]");
    };
    

    for(var i = 0, ilen = _child.length; i < ilen; i++) {

        if(_child[i].nodeType == 3) {

            let _match = _child[i].nodeValue.match(/\w+/g);

            if(_match !== null) {

                let _value = _child[i].nodeValue.replace(/\n|\s\s/g, "");
                let _test = "";

                if(_match.length > 1 || _children.length > 0) {
                    
                    if(_value.indexOf("{") !== -1) {
                        let _split = _value.split(/{.*?}/g);
                        let _key = _value.match(/{.*?}/g);
    
                        for(var j = 0, jlen = _split.length; j < jlen; j++) {
    
                            if(_split[j] !== "" && _split[j] !== " ") {
                                _test += `this._nx("t",\`${_split[j]}\`),`;
                            };
                            _test += ((typeof(_key[j]) !== "undefined") ? `this._nx("t",\`${_key[j]}\`),` : "");
    
                        };
                    }
                    else {
                        _test += `this._nx("t",\`${_child[i].nodeValue}\`),`;
                    }

                }
                else {
                    _test += `\`${_value}\``;
                };

                _child_code += _test;
                
            };
        }
        else {
            _child_code += this.DOMConstruct(_child[i]) + ",";
        };

    };

    if(_child_code.indexOf(",") !== -1) {
        _child_code = `[${_child_code}]`;
    }
    else {
        if(_child_code == "") {
            _child_code = "[]";
        }
        //
    }

    //
    let _code = `this._nx("${_element.tagName.toLowerCase()}",${_child_code}${_attribute_value})`;
    
    //
    return _code.replace(/,\]/g, "]").replace(/,,/g, ",");

};

module.exports = Transpiler;