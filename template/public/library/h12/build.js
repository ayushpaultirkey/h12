const Method = {};
Method.List = {};

class Component {
    constructor() {
        this.id = `c-${crypto.randomUUID()}`;
        this.parent = {};
        this.child = {};
        this.binding = { "@e": {} };
        this.root = null;
        this.wait = true;
        this.args = {};
    }

    async init() { }
    async render() { return document.createElement("div"); }

    Unique(_unique = "", _object = {}) {

        let _element = this.root.querySelectorAll(`[${_unique}]`);
        _element.forEach(x => {
            let _id = "x" + Math.random().toString(36).slice(6);
            /*_object[x.getAttribute(_unique)] = _id;*/
            _object[x.getAttribute(_unique)] = x;
            x.setAttribute(_unique, _id);
        });

    }

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
            _component.args = _value;

            this.child[_component.id] = _component;

            return await _component._init(null, _value);
        }
        else {
            return document.createTextNode("");
        };

    }

    _nx(_node = null, _value = "", _property = {}) {

        //
        let _id = "x" + Math.random().toString(36).slice(6);
        let _root = null;
        let _unique = false;
        
        //
        if(_node === "t") {

            if(_value.indexOf("{") == -1) {
                _root = document.createTextNode(_value);
            }
            else {
                _root = document.createElement("span");
                _root.innerText = _value;
                _root.classList.add(_id);
                this._bx(_value, `.${_id}`, 2);
            };

        }
        else {

            //
            _root = document.createElement(_node);

            //
            for(const _key in _property) {

                let _data = _property[_key];
                
                if(_data instanceof Object) {
                    for(const _dkey in _data) {

                        let _attribute = ((_root.hasAttribute(_dkey)) ? _root.getAttribute(_dkey) : "") + _data[_dkey].toString();

                        if(_attribute.indexOf("{") !== -1) {
                            _bax.bind(this)(_attribute, _dkey, _id);
                            _unique = true;
                        };

                        _root.setAttribute(_dkey, _attribute);

                    };
                    continue;
                };

                _data = ((_root.hasAttribute(_key)) ? _root.getAttribute(_key) : "") +  _data.toString();

                if(_data.indexOf("{") !== -1) {
                    _bax.bind(this)(_data, _key, _id);
                    _unique = true;
                };

                _root.setAttribute(_key, _data);

            };

            //
            if(_value instanceof Array) {
                _value.forEach(x => {
                    _root.appendChild(x);
                });
            }
            else {

                _root.innerHTML = _value;

                if(_value.indexOf("{") !== -1) {
                    this._bx.bind(this)(_value, `.${_id}`, 2);
                    _unique = true;
                };
                
            };

            //
            if(_unique) {
                _root.classList.add(_id);
            };

        };

        return _root;

    }

    _bx(_key, _node, _type, _object = {}) {
        if(typeof(this.binding[_key]) == "undefined") {
            this.binding[_key] = { value: _key, e: [] };
        };
        if(typeof(this.binding["@e"][_node]) == "undefined") {
            this.binding["@e"][_node] = {};
        };
        if(_type == 1) {
            if(_object.attr == "class") {
                _object.data += ` ${_node.replace(/\./g, "")}`;
            };
            if(typeof(this.binding["@e"][_node][_object.attr]) == "undefined") {
                this.binding["@e"][_node][_object.attr] = {};
                this.binding["@e"][_node][_object.attr]["@value"] = _object.data;
                this.binding["@e"][_node][_object.attr]["@key"] = [];
            };
            this.binding["@e"][_node][_object.attr]["@key"].push(_key);
            delete _object.data;
        };
        this.binding[_key].e.push({ type: _type, node: _node, ... _object });
    }

    Set(_key = "", _value = "") {

        let _bind = this.binding[_key.replace("++", "")];
        if(typeof(_bind) !== "undefined") {

            let _element = _bind.e;
            for(var i = 0, ilen = _element.length; i < ilen; i++) {

                const _item = _element[i];
                if(_item.type == 1) {

                    let _node = _item.node;
                    let _attribute = this.binding["@e"][_node];
                    let _element = (this.root.classList.contains(_node.replace(".", ""))) ? this.root : this.root.querySelector(_node);
                    
                    if(typeof(_attribute) == "undefined" || typeof(_attribute[_item.attr]) == "undefined" || _element == null) {
                        continue;
                    };

                    //
                    let _avalue = _attribute[_item.attr]["@value"];
                    let _akey = _attribute[_item.attr]["@key"];

                    //
                    if(typeof(_value) === "function") {

                        const _eid = `e-${crypto.randomUUID()}`;
                        Method.List[_eid] = { event: _value.bind(this), e: _node[i].selector };
                        _value = `hxh.List[\"${_eid}\"].event();`;

                    };
                    _avalue = _avalue.replace(new RegExp(_key.replace("++", ""), "g"), _value);

                    //
                    _akey.forEach(x => {
                        _avalue = _avalue.replace(new RegExp(x, "g"), this.binding[x].value);
                    });

                    //
                    _element.setAttribute(_item.attr, _avalue);

                }
                else if(_item.type == 2) {

                    let _node = (this.root.classList.contains(_item.node.replace(".", ""))) ? this.root : this.root.querySelector(_item.node);

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

    Style(_property = {}) {
        let _string = "";
        for(var _key in _property) {
            _string += `${_key}:${_property[_key]};`;
        };
        return _string;
    }

    async _init(_element = null, _args = {}) {

        this.root = (typeof(this.warp) === "function") ? await this.warp() : await this.render();
        (this.wait) ? await this.init(_args) : this.init(_args);
        
        if(_element == null) {
            return this.root;
        };

        document.querySelector(_element).appendChild(this.root);
    }

}


function _bax(_value, _attribute, _id) {

    let _match = _value.match(/{\w\S+?}/gm);
    if(_match !== null) {

        let _temp = [];

        _match.forEach(x => {

            if(!_temp.includes(x)) {
                this._bx(x, `.${_id}`, 1, { data: _value, attr: _attribute });
                _temp.push(x);
            };

        });

    };

};


Component.Render = async function(component = null, args = {}, element = "") {

    const _component = new component();
    await _component._init(element, args);

};

window.hxc = Component;
window.hxh = Method;

export default { Component, Method };