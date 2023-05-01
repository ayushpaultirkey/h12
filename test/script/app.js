import Component from "../../component.js";

class App extends Component {
    constructor() {
        super();
    }
    init() {
        this.count = 0;
        this.Set("{*}", "");
        this.Set("{count}", this.count);
        this.Set("{add}", this.add);
    }
    render() {

        return `
            <label>Counter: {count}</label>
            <br/>
            <button onclick="{add}">Add</button>
        `;

    }
    add() {
        this.count++;
        this.Set("{count}", this.count);
    }
}

Component.Render(await Component.Create(App), ".app");