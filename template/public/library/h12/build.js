const Method = {};

Method.List = {};

class Component {
    constructor() {
        this.id = `c-${crypto.randomUUID()}`;
        this.parent = {};
        this.child = {};
        this.binding = { "@element": {} };
        this.root = null;
    }

    Unique(_unique = "", _object = {}) {

        let _element = this.root.querySelectorAll(`[${_unique}]`);
        _element.forEach(x => {
            let _id = "x" + Math.random().toString(36).slice(6);
            _object[x.getAttribute(_unique)] = _id;
            x.setAttribute(_unique, _id);
        });

    }

    async init() { }
    async render() { return document.createElement("div"); }

    async _cx(_node = null, _value = "") {

        //
        if(_node instanceof Object) {

            const _component = new _node();

            if(_value instanceof Object) {
                _value = (typeof(_value["args"]) !== "undefined") ? _value["args"] : _value;

                if(typeof(_value["id"]) !== "undefined") {
                    _component.id = _value["id"];
                };
            };

            _component.parent[this.id] = this;

            this.child[_component.id] = _component;

            return await _component._init(null, _value);
        }
        else {
            return document.createTextNode("");
        };

    }

    _nx(_node = null, _value = "", _property = {}) {

        //
        let _root;
        let _id = "x" + Math.random().toString(36).slice(6);

        //If text
        if(_node === "t") {

            if(_value.indexOf("{") == -1) {
                _root = document.createTextNode(_value);
            }
            else {
                _root = document.createElement("span");
                _root.innerText = _value;
                _root.classList.add(`${_id}`)
                this._bind(_value, `.${_id}`, 2);
            };

        }
        else {

            //
            _root = document.createElement(_node);
            let _unique = false;
            
            //
            if(_property instanceof Object) {
                for(const _key in _property) {
    
                    //
                    let _key_value = _property[_key];

                    //
                    if(_key_value instanceof Object) {
                        for(const _vkey in _property[_key]) {

                            //
                            let _name = _vkey;
                            let _attribute = _key_value[_vkey];
                            
                            //
                            if(_isn(_vkey) && _attribute instanceof Array) {

                                let _join = ((_attribute.join("").includes(":")) ? ";" : "");
                                _attribute = _attribute.join(_join) + _join;
                                _name = _key;

                            };

                            //
                            _attribute = _attribute.toString();
                            
                            //
                            _axb.bind(this)(_attribute, _name, _id);
                            
                            //
                            if(_attribute.indexOf("{") !== -1) {
                                _unique = true;
                            };

                            _root.setAttribute(_name, _attribute);

                        };
                        continue;
                    };

                    //
                    _root.setAttribute(_key, _key_value);
                    if(_key_value.indexOf("{") !== -1) {
    
                        //
                        _unique = true;
    
                        //
                        _axb.bind(this)(_key_value.toString(), _key, _id);
    
                    };

                };
            };

            //
            if(_unique) {
                _root.classList.add(`${_id}`);
            };

            //
            _value.forEach(x => {
                _root.appendChild(x);
            });

        };

        //
        return _root;

    }

    _bind(_key, _node, _type, _object = {}) {
        if(typeof(this.binding[_key]) == "undefined") {
            this.binding[_key] = { value: _key, element: [] };
        };
        if(typeof(this.binding["@element"][_node]) == "undefined") {
            this.binding["@element"][_node] = {};
        };
        if(_type == 1) {
            if(_object.attribute == "class") {
                _object.data += ` ${_node.replace(/\./g, "")}`;
            };
            if(typeof(this.binding["@element"][_node][_object.attribute]) == "undefined") {
                this.binding["@element"][_node][_object.attribute] = {};
                this.binding["@element"][_node][_object.attribute]["@value"] = _object.data;
                this.binding["@element"][_node][_object.attribute]["@key"] = [];
            };
            this.binding["@element"][_node][_object.attribute]["@key"].push(_key);
            delete _object.data;
        };
        //this.binding[_key].element.push({ type: _type, node: _node, ... _object });
        this.binding[_key].element.push({ type: _type, node: _node, ... _object });
    }

    Set(_key = "", _value = "") {

        let _bind = this.binding[_key.replace("++", "")];
        if(typeof(_bind) !== "undefined") {

            let _element = _bind.element;
            for(var i = 0, ilen = _element.length; i < ilen; i++) {

                const _item = _element[i];
                if(_item.type == 1) {

                    let _node = _item.node;
                    let _attribute = this.binding["@element"][_node];
                    let _is_root = this.root.classList.contains(_node.replace(".", ""));

                    if(typeof(_attribute) == "undefined" || typeof(_attribute[_item.attribute]) == "undefined" || this.root.querySelector(_node) == null) {
                        if(!_is_root) {
                            continue;
                        };
                    };

                    //
                    let _avalue = _attribute[_item.attribute]["@value"];
                    let _akey = _attribute[_item.attribute]["@key"];

                    //
                    if(typeof(_value) === "function") { 

                        const _eid = `e-${crypto.randomUUID()}`;
                        Method.List[_eid] = { event: _value.bind(this), element: _node[i].selector };
                        _value = `hxh.List[\"${_eid}\"].event();`;

                    };
                    _avalue = _avalue.replace(new RegExp(_key.replace("++", ""), "g"), _value);

                    //
                    _akey.forEach(x => {
                        _avalue = _avalue.replace(new RegExp(x, "g"), this.binding[x].value);
                    });

                    //
                    if(_is_root) {
                        this.root.setAttribute(_item.attribute, _avalue);
                    }
                    else {
                        this.root.querySelector(_node).setAttribute(_item.attribute, _avalue);
                    };

                }
                else if(_item.type == 2) {

                    let _node = this.root.querySelector(_item.node);
                    if(_node == null) {
                        continue;
                    };

                    let _index = _key.indexOf("++");
                    if(_value instanceof Element) {

                        if(_index !== -1) {
                            _node.insertAdjacentElement((_index == 0) ? "afterbegin" : "beforeend", _value);
                        }
                        else {
                            _node.childNodes.forEach(x => x.remove());
                            _node.appendChild(_value);
                        };

                        _value = _value.outerHTML;
                    }
                    else {
                        if(_index !== -1) {
                            _node.insertAdjacentHTML((_index == 0) ? "afterbegin" : "beforeend", _value);
                            _value = _bind.value + _value;
                        }
                        else {
                            _node.innerHTML = _value;
                        };
                    };

                };

            };

            //
            _bind.value = _value;

        };

    }

    Get(_key) {
        let _bind = this.binding[_key];
        return (typeof(_bind) !== "undefined") ? _bind.value : null;
    }

    async _init(_element = null, _args = {}) {
        this.root = await this.render();
        this.init(_args);
        if(_element == null) {
            return this.root;
        };
        document.querySelector(_element).appendChild(this.root);
    }

}

function _isn(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
};

function _axb(_value, _attribute, _id) {

    let _match = _value.match(/{\w\S+?}/gm);
    if(_match !== null) {

        let _temp = [];

        _match.forEach(x => {

            if(!_temp.includes(x)) {
                this._bind(x, `.${_id}`, 1, { data: _value, attribute: _attribute });
                _temp.push(x);
            };

        });

    };

};


Component.Render = async function(_component = null, _element = "") {

    const _c = new _component();
    await _c._init(_element);

};

window.hxc = Component;
window.hxh = Method;

export default { Component, Method };