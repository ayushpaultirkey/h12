import Component from "./../library/h12/component.js";

@Component
class App extends Component {
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

Component.Render(<App args />, ".app");