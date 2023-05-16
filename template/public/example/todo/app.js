import H12 from "../../library/h12.js";
import Item from "./item.js";

@Component
class App extends H12.Component {
    constructor() {
        super();
        this.element = {};
    }
    async init() {
        this.Set("{item}", "");
        this.Set("{add}", this.add);
        this.Set("{visible}", "none");
        this.Unique("id", this.element);
    }
    async render() {

        return <>
            <div>
                <label style="display: {visible};">Enter item !</label>
                <input type="text" placeholder="Enter item" id="box" />
                <button onclick="{add}">Add</button>
                <div>
                    {item}
                </div>
            </div>
        </>;

    }
    async add() {

        const _node = document.getElementById(this.element.box)
        const _value = (_node !== null) ? _node.value : "";

        if(_value !== "") {
            this.Set("{item}++", <Item args={{ value: _value }} />);
            this.Set("{visible}", "none");
        }
        else {
            this.Set("{visible}", "block");
        };

    }
}

H12.Component.Render(<App args />, ".app");