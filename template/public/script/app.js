import Component from "./../library/h12/component.js";

@Component
class App extends Component {
    constructor() {
        super();
    }
    init() {

    }
    render() {

        return ([
            <div>
                <label>Hello world</label>
            </div>
        ]);

    }
}

Component.Render(<App args />, ".app");