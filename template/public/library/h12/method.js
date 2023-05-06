const Method = {};

Method.List = {};

Method.Flush = function() {

    for(var item in this.List) {
        
        const _item = this.List[item];
        const _element = document.querySelector(`.${_item.e}`);
        if(_element == null) {
            delete this.List[item];
        };

    };

};


window.h12m = Method;

export default Method;