import H12 from "./../library/h12/component.min.js";

@Component
class App extends H12.Component {
    constructor() {
        super();
    }
    init() {
        this.count = 0;
        this.Set("{add}", this.add);
        this.Set("{count}", this.count);
    }
    render() {

        return (
            <div>
                <label>Counter: {count}</label>
                <br />
                <button onclick="{add}">Add</button>
            </div>
        );

    }
    add() { 
        this.count++;
        this.Set("{count}", this.count);
    }
}

H12.Component.Render(<App args />, ".app");