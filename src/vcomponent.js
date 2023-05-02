const jsdom = require("jsdom");
const crypto = require("crypto");

class VComponent {
    constructor() {
        this.binding = { "@element": [], "@default": null };
        this.template = "";
        this.script = "";
        this.document = null;
        this.__vdom = null;
    }

    __build_binding() {


        const _match = this.template.matchAll(/{.*?}/g);
            for(const _key of _match) {
            
            if(typeof(this.binding[_key[0]]) === "undefined" && !_key[0].includes("await h12c")) {

                this.binding[_key[0]] = { data: _key[0], element: [] };

            };

        };

    }

    __build_template() {

        if(this.script.length > 0) {


            const _match_template = this.script.matchAll(/return.*?\(\[(.*?)\]\)/gms);
            for(const _key of _match_template) {
                
                //
                const _match_init = this.script.match(/(async\s+|)init\(\)\s+\{/gm);
                let _script = (_match_init !== null) ? _match_init[0] : "init() {";

                //
                const _match_tag = _key[1].matchAll(/<(\w+)\s+args(?:=|)(?:"(.*?)"|).*?\/>/gm);
                for(const _tag of _match_tag) {

                    const _id = "cmp-" + crypto.randomUUID().replace(/\-/g, "_");
                    _key[1] = _key[1].replace(_tag[0], `<span>{${_id}}</span>`);
                    _script += `\n\tthis.Set("{${_id}}", await h12c.Create(${_tag[1]}));`;
                    
                };

                this.script = this.script.replace(/(async\s+|)init\(\)\s+\{/gm, _script);

                this.template = _key[1];

                this.__vdom = new jsdom.JSDOM(`<!DOCTYPE html><html><body>${this.template}</body></html>`);
                this.document = this.__vdom.window.document;
                break;

            };

        };

    }

    __build_document() {

        if(this.document == null && this.__vdom == null) {
            return false;
        };

        const _child = this.document.querySelectorAll("body *");

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


    }

    __pack() {
        
        if(this.document == null && this.__vdom == null) {
            return false;
        };

        let _script = this.script;
        
        //
        const _match_super = _script.match(/super\(\)(;|)/gm);
        if(_match_super !== null) {

            let _pack = `
        super();
        this.template = \`${this.document.body.innerHTML}\`;
        this.binding = ${JSON.stringify(this.binding)};
        this.packed = true;
            `;
            _script = _script.replace(_match_super[0], _pack);

        };

        return _script;

    }

    __init() {
        this.__build_template();
        this.__build_binding();
        this.__build_document();
    }
}

module.exports = VComponent;