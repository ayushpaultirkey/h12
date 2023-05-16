import H12 from "./../../library/h12.js";

@Component
class App extends H12.Component {
    constructor() {
        super();
    }
    async init() {
        this.count = 0;
        this.Set("{counter}", this.count);
        this.Set("{add}", this.add);
    }
    async render() {

        return <>
            <div>
                <label>Count: {counter}</label>
                <br />
                <button onclick="{add}">Increase</button>
            </div>
        </>;

    }
    add() {
        this.count++;
        this.Set("{counter}", this.count);
    }
}

H12.Component.Render(<App args />, ".app");