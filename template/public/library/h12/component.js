import Method from "./method.js";

class Component {

    constructor() {
        this.binding = { "@element": [], "@default": null };
        this.document = null;
        this.template = "";
        this.packed = false;
        this.rendered = false;
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
        _child.forEach(x => {

            if(x.outerHTML.includes("{")) {

                //Create unique id
                const _uid =  `uid-${crypto.randomUUID()}`;

                //
                const _outer = x.outerHTML.replace(x.innerHTML, "");
                const _outer_match = _outer.matchAll(/(\S+)=["]?((?:.(?!["]?\s+(?:\S+)=|[>"]))+.)["]?/gm);

                //
                for(const _key of _outer_match) {

                    const _variable = _key[2].match(/{.*?}/g);
                    if(_variable !== null) {

                        //
                        x.classList.add(_uid);

                        //
                        _key[2] += (_key[1] == "class") ? ` ${_uid}` : "";

                        //
                        if(!this.binding["@element"].includes(_uid)) {
                            this.binding["@element"].push(_uid);
                        };

                        //
                        let _tmp = [];

                        //
                        _variable.forEach(y => {

                            if(!_tmp.includes(y) && typeof(this.binding[y]) !== "undefined") {
                                const _count = _key[2].match(new RegExp(y, "g"));
                                this.binding[y].element.push({ selector: _uid, type: 0, attribute: _key[1], count: (_count !== null) ? _count.length : 0 });
                                _tmp.push(y);
                            };

                        });

                    };

                };

                //
                if(x.childElementCount == 0) {

                    //
                    const _list = [];

                    //
                    const _inner_match = x.innerHTML.matchAll(/{.*?}/g);

                    //
                    for(const _key of _inner_match) {

                        if(_key !== null) {

                            //
                            let _id = "";

                            //
                            if(_key.index > 2) {
                                _id =  `uid-${crypto.randomUUID()}`;
                                x.innerHTML = x.innerHTML.replace(_key, `<span class="${_id}">@${_list.length}</span>`);
                                _list.push(_key[0]);
                            }
                            else {
                                _id = _uid;
                                x.classList.add(_uid);
                            };

                            //
                            if(!this.binding["@element"].includes(_id)) {
                                this.binding["@element"].push(_id);
                            };

                            //
                            this.binding[_key].element.push({ selector: _id, type: 1 });

                        };


                    };

                    //
                    for(var i = 0, l = _list.length; i < l; i++) {
                        x.innerHTML = x.innerHTML.replace(`@${i}`, _list[i]);
                    };

                };

            };

        });

        //
        console.warn(`H12.Component.__build_document(): ${this.constructor.name} component builded`);

        //Set the new document
        this.document = _parsed;

    };

    async __render(_element = null) {

        this.rendered = true;

        if(_element !== null) {
            document.querySelector(_element).cloneNode()
            document.querySelector(_element).innerHTML = this.document.body.innerHTML;
            return null;
        }
        else {
            return this.document;
        };
        
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
        return this.__render(_element);

    };

    async init() {

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

        if(_key == "{*}") {
            
            const _bind = this.binding;
            for(var _key in _bind) {
                if(_key !== "@element" && _key !== "@default") {
                    this.Set(_key, "");
                };
            };
            return false;

        };

        if(_key.includes("++")) {
            this.Append(_key, _value);
            return false;
        };

        //
        const _bind = this.binding[_key];
        const _document = (!this.rendered) ? this.document : document;

        //
        if(typeof(_bind) !== "undefined") {

            //
            _bind.element.forEach(x => {

                //
                const _element = _document.querySelector(`.${x.selector}`);

                //
                if(x.type == 0) {

                    //
                    let _data = "";
                    if(typeof(_value) === "function") {

                        //
                        _data = _element.getAttribute(x.attribute);

                        //
                        const _eid = `event-${crypto.randomUUID()}`;
                        Method.List[_eid] = { event: _value.bind(this), element: x.selector };
                        _value = `h12m.List[\"${_eid}\"].event();`;

                        //
                        for(var i = 0, len = x.count; i < len; i++) {

                            const _match = _data.match(new RegExp(`^(?:.*?)(${_bind.data})`, "g"));
                            if(_match !== null) {
                                _data = _data.replace(_match[0], _match[0].replace(_bind.data, _value));
                            };
                            
                        };


                    }
                    else {

                        //
                        _data = _element.getAttribute(x.attribute);

                        //
                        const _match_var = (!_bind.data.includes("{")) ? `(?:\\b)` : "";

                        //
                        for(var i = 0, len = x.count; i < len; i++) {

                            const _match = _data.match(new RegExp(`^(?:.*?)${_match_var}(${_bind.data})${_match_var}`, "g"));
                            if(_match !== null) {
                                _data = _data.replace(_match[0], _match[0].replace(_bind.data, _value));
                            };
                            
                        };

                        _data = (_data.length == 0) ? _value : _data;

                        if(x.attribute.toLowerCase() == "value") {
                            _element.value = _data;
                        };

                    };

                    //
                    _element.setAttribute(x.attribute, _data);

                }
                else if(x.type == 1) {
                    _element.innerHTML = _value;
                };

            });

            //
            _bind.data = _value;

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

};



Component.Render = function(_template = null, _element = null, _argument = {}) {

    document.querySelector(_element).insertAdjacentHTML("beforeend", _template);

};

Component.Create = async function(_component = null, _argument = {}) {

    let _response = "";

    try {
        const _com = new _component();
        _response = await _com.__init(null, _argument);
        _response = (_response == null) ? "" : _response.body.innerHTML;
    }
    catch(ex) {
        console.error(ex);
    };

    return _response;

};

window.h12c = Component;

export default Component;