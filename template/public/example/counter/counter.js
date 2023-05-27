import H12 from "../../library/h12.js";

@Component
class Counter extends H12.Component {
    constructor() {
        super();
        this.prop = {
            "style": this.Style({
                "padding": "6px 16px",
                "display": "block",
                "background-color": "dodgerblue",
                "border": "none",
                "border-radius": "8px"
            })
        }
    }
    init(args) {
        this.count = args.number;
        this.Set("{count}", this.count);
        this.Set("{add}", this.increment);
    }
    render() {
        return <>
            <div>
                <label>Count: {count}</label>
                <button inherit={ ... this.prop } onclick="{add}">Add</button>
            </div>
        </>;
    }
    increment() {
        this.count++;
        this.Set("{count}", this.count);
    }
    reset() {
        this.count = 0;
        this.Set("{count}", this.count);
    }
}

export default Counter;