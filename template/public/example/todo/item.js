import H12 from "../../library/h12.js";

@Component
class Item extends H12.Component {
    constructor() {
        super();
        this.element = {};
    }
    async init(_args = {}) {
        this.Set("{value}", _args.value);
        this.Set("{done}", "unset");
        this.Set("{check}", this.check);
        this.Set("{remove}", this.remove);
    }
    async render() {

        return <>
            <div style="background-color: rgb(230, 230, 230); margin-bottom: 6px; padding: 6px;">
                <label style="text-decoration: {done}; font-size: x-large;">{value}</label>
                <br />
                <button onclick="{check}">O</button>
                <button onclick="{remove}">X</button>
            </div>
        </>;

    }
    remove() {
        this.root.remove();
    }
    check() {
        if(this.Get("{done}") == "unset") {
            this.Set("{done}", "line-through");
        }
        else {
            this.Set("{done}", "unset");
        };
    }
}

export default Item;