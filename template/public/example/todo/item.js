import H12 from "../../library/h12.js";

@Component
class Item extends H12.Component {
    constructor() {
        super();
        this.element = {};
    }
    async init(_args = {}) {
        this.Set("{value}", _args.value);
        this.Set("{remove}", this.remove);
    }
    async render() {

        return <>
            <div>
                <label>{value}</label>
                <button onclick="{remove}">X</button>
            </div>
        </>;

    }
    remove() {
        this.root.remove();
    }
}

export default Item;