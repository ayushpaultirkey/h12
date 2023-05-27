import H12 from "../../library/h12.js";
import Counter from "./counter.js";

@Component
class App extends H12.Component {
    constructor() {
        super();
    }
    init() {
        this.Set("{click}", this.click);
    }
    async render() {
        return <>
            <div>
                <Counter args={{ id: "counter-1", number: 5 }} />
                <br />
                <button onclick="{click}">Reset</button>
            </div>
        </>;
    }
    click() {
        this.child["counter-1"].reset();
    }
}

H12.Component.Render(<App args />, ".app");