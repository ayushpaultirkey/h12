"use strict"
import Method from "./method.js";

class Component {

    constructor() {
        this.id = `comp-${crypto.randomUUID()}`;
        this.binding = { "@element": [], "@default": null };
        this.document = null;
        this.template = "";
        this.packed = false;
        this.rendered = false;
        this.child = {};
        this.parent = {};
    };

    __build_rebind() {

        let _binding = JSON.stringify(this.binding);
        let _element = this.binding["@element"];
        let _template = this.template;

        //
        _element.forEach(x => {

            const _id = `uid-${crypto.randomUUID()}`
            _binding = _binding.replace(new RegExp(x, "g"), _id);
            _template = _template.replace(new RegExp(x, "g"), _id);

        });

        //
        this.binding = JSON.parse(_binding);
        this.template = _template;

    };

    __build_packed() {

        //
        if(this.packed) {
            this.__build_rebind();
            const _dom = new DOMParser();
            this.document = _dom.parseFromString(this.template, "text/html");
            console.warn(`H12.Component.__build_packed(): ${this.constructor.name} component pack loaded with remapped binding`);
        };

    };

    __build_binding(_template = "") {
        
        //
        const _match = _template.matchAll(/{.*?}/g);
        for(const _key of _match) {

            //
            if(typeof(this.binding[_key[0]]) === "undefined") {

                //
                this.binding[_key[0]] = { data: _key[0], element: [] };

            };

        };

    };

    __build_template(_template = "") {

        //If document is null then build template and set the
        //template to body.innerHTML
        if(this.document == null) {
            this.__build_document(_template);
        };

        this.template = this.document.body.innerHTML;

    };

    __build_document(_template = "") {

        const _dom = new DOMParser();
        const _parsed = _dom.parseFromString(_template, "text/html");
        const _child = _parsed.querySelectorAll("body *");

        //
        for(var i = 0, ilen = _child.length; i < ilen; i++) {

            const _element = _child[i];
            if(_element.outerHTML.indexOf("{") == -1) {
                continue;
            };

            //
            let _inner = _element.innerHTML;
            let _outer = _element.outerHTML.replace(`>${_inner}<`, "><");
            const _attribute = _element.getAttributeNames();

            //
            const _uid =  `uid-${crypto.randomUUID()}`;

            //
            for(var j = 0, jlen = _attribute.length; j < jlen; j++) {

                if(_attribute[j].indexOf("{") !== -1) {

                    //
                    if(!this.binding["@element"].includes(_uid)) {
                        this.binding["@element"].push(_uid);
                    };

                    _element.classList.add(_uid);
                    this.binding[_attribute[j]].element.push({ selector: _uid, type: 2 });

                };

                const _value = _element.getAttribute(_attribute[j]);
                
                //
                if(_value.indexOf("{") !== -1) {

                    const _value_match = _value.match(/{\w+}/g);
                    if(_value_match == null) {
                        continue;
                    };

                    //duplicate class {key} are removed
                    //console.log(_element.outerHTML);
                    _element.classList.add(_uid);
                    //console.log(_element.outerHTML);

                    //
                    if(!this.binding["@element"].includes(_uid)) {
                        this.binding["@element"].push(_uid);
                    };


                    //
                    let _temp = [];

                    for(var k = 0, klen = _value_match.length; k < klen; k++) {

                        const _key = _value_match[k];

                        if(!_temp.includes(_key) && typeof(this.binding[_key]) !== "undefined") {
                            const _count = _value.match(new RegExp(_key, "g"));
                            this.binding[_key].element.push({ selector: _uid, type: 1, attribute: _attribute[j], count: (_count !== null) ? _count.length : 0 });
                            _temp.push(_key);
                        };

                    };

                };

            };

            //
            if(_element.childElementCount == 0) {

                const _inner_match = _inner.match(/{\w+}/g);
                            
                if(_inner_match !== null) {

                    //
                    for(var j = 0, jlen = _inner_match.length; j < jlen; j++) {

                        let _id = "";
                        
                        if(_inner.indexOf(" ") !== -1 || jlen > 1) {
                            _id = `uid-${crypto.randomUUID()}`;
                            _inner = _inner.replace(_inner_match[j], `<span class="${_id}">${_inner_match[j].replace("}", "-_-}")}</span>`);
                        }
                        else {
                            _id = _uid;
                            _element.classList.add(_id);
                        };

                        //
                        if(!this.binding["@element"].includes(_id)) {
                            this.binding["@element"].push(_id);
                        };

                        //
                        this.binding[_inner_match[j]].element.push({ selector: _id, type: 0 });


                    };
                    _inner = _inner.replace(/-_-/g, "");


                    _element.innerHTML = _inner;

                };


            };

        };

        //
        console.warn(`H12.Component.__build_document(): ${this.constructor.name} component builded`);

        //Set the new document
        this.document = _parsed;

    };

    async __init(_element = null, _argument = {}) {

        //
        if(!this.packed) {

            const _render = await this.render();
            this.__build_binding(_render);
            this.__build_template(_render);

        }
        else {
            this.__build_packed();
        };

        //
        await this.init(_argument);
        
        //
        return this.document;

    };

    async init() {

    };

    async after() {

    };

    async render() {
        return "";
    };

    Unique(_key = "", _object = {}) {

        //
        const _child = this.document.querySelectorAll(`[${_key}]`);
        
        //
        _child.forEach(x => {

            const _id = `id-${crypto.randomUUID()}`;

            _object[x.getAttribute(_key)] = _id;
            x.id = _id;

        });

    };

    Append(_key = "", _value = "") {

        //
        const _bind = this.binding[_key.replace("++", "")];
        const _document = (!this.rendered) ? this.document : document;
        const _position = (_key.includes("++")) ? (_key.indexOf("++") == 0) ? "afterbegin" : "beforeend" : "";

        //
        if(typeof(_bind) !== "undefined") {
            
            _bind.element.forEach(x => {

                const _element = _document.querySelector(`.${x.selector}`);
                if(x.type == 1) {
                    _element.insertAdjacentHTML(_position, _value);
                };

            });

        };


    };

    Set(_key = "", _value = "") {

        const _bind = this.binding[_key];
        const _document = (!this.rendered) ? this.document : document;

        //
        if(typeof(_bind) !== "undefined") {

            let _success = false;
            const _node = _bind.element;
            for(let i = 0, ilen = _node.length; i < ilen; i++) {

                //
                const _element = _document.querySelector(`.${_node[i].selector}`);
                
                if(_node[i].type == 0) {
                    
                    _element.innerHTML = _value;
                    _success = true;

                }
                else if(_node[i].type == 2) {
                    
                    let _data = _element.getAttribute(_bind.data);
                    _element.removeAttribute(_bind.data);

                    if(_value.length !== 0) {
                        _element.setAttribute(_value, (_data == null) ? "" : _data);
                    };

                    _success = true;

                }
                else if(_node[i].type == 1) {

                    //
                    let _regex = "";
                    let _attribute = _node[i].attribute;

                    if(_attribute.indexOf("{") !== -1) {
                        if(typeof(this.binding[_attribute]) !== "undefined") {
                            _attribute = this.binding[_attribute].data;
                        }
                        else {
                            continue;
                        }
                    };

                    let _data = _element.getAttribute(_attribute);
                    if(_data == null) {
                        continue;
                    };

                    //
                    if(typeof(_value) === "function") {

                        //
                        const _eid = `event-${crypto.randomUUID()}`;
                        Method.List[_eid] = { event: _value.bind(this), element: _node[i].selector };
                        _value = `h12m.List[\"${_eid}\"].event();`;

                    };
                    
                    if(typeof(_value) === "number") {
                        _value = _value.toString();
                    };

                    //
                    const _symbol_match = _bind.data.match(/[\W]/g);
                    if(_bind.data.includes(" ") || _symbol_match !== null) {
                        
                        const _symbol = [ ...new Set(_symbol_match) ];
                        let _fdata = _bind.data;

                        //console.error(_fdata);
                        //console.error(_symbol);

                        _symbol.forEach(x => {
                            if(x !== " ") {
                                _fdata = _fdata.replace(new RegExp(x.replace(x, `\\${x}`), "g"), `\\${x}`);
                            };
                        });

                        _regex = `^(.*?)(${_fdata})`;

                        //console.error(_regex);
                        //console.error(_fdata);

                    }
                    else {
                        _regex = `^(.*?)(?:\\b)(${_bind.data})(?:\\b)`;
                    };

                    //console.warn("IN:", _regex, "FOR:", `"${_data}" USING: "${_bind.data}"`);

                    //
                    for(var j = 0, jlen = _node[i].count; j < jlen; j++) {


                        //console.log("INDEX:", j, _bind.data);
                        const _match = _data.matchAll(new RegExp(_regex, "g"));

                        for(var _key of _match) {

                            _data = _data.replace(_key[0], (_key[1] + _key[2].replace(_bind.data, _value)));
                            //console.log(_data);

                        };

                    };
                    
                    //console.warn("OUT:", _data)

                    //
                    _element.setAttribute(_attribute, _data);

                    _success = true;

                };

            };

            if(_success) {
                _bind.data = _value;  
            };

        };

    };

    Get(_key = "") {

        const _bind = this.binding[_key];
        const _document = (!this.rendered) ? this.document : document;

        if(typeof(_bind) !== "undefined") {

            const _element = this.binding[_key].element;
            let _data = _bind.data;

            for(var i = 0, len = _element.length; i < len; i++) {

                if(_element[i].type == 0 && typeof(_element[i].attribute) !== "undefined" && _element[i].attribute == "value") {
                    _data = _document.querySelector(`.${_element[i].selector}`).value;
                    break;
                };

            };

            return _data;
        };

        return null;

    };

    Property(_object = {}) {
        let _string = ``;
        for(var _key in _object) {
            _string += ` ${_key}="${_object[_key]}" `;
        };
        return _string;
    };

    Style(_object = {}) {
        let _string = ``;
        for(var _key in _object) {
            _string += `${_key}: ${_object[_key]};`;
        };
        return _string;
    };

};



Component.Render = function(_template, _element = null, _argument = {}) {

    document.querySelector(_element).insertAdjacentHTML("beforeend", _template.template);
    _template.component.rendered = true;

    const _child = _template.component.child;
    for(var _k in _child) {
        _child[_k].rendered = true;
        _child[_k].after();
    };
    
    _template.component.after();

};

Component.Create = async function(_component = null, _argument = {}, _parent = null) {

    let _response = "";

    try {
        _component = new _component();

        if(typeof(_argument.id) !== "undefined") {
            _component.id = _argument.id;
        };

        if(_parent !== null && typeof(_parent) !== "undefined") {
            _component.parent[_parent.id] = _parent;
            _parent.child[_component.id] = _component;
        };

        _response = await _component.__init(null, _argument);
        _response = (_response == null) ? "" : _response.body.innerHTML;

    }
    catch(ex) {
        console.error(ex);
    };

    return { template: _response, component: _component};

};

window.h12c = Component;

export default Component;