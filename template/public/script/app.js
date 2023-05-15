import Component from "./../library/h12/module/component.js";

@Component
class App extends Component {
    constructor() {
        super();
    }
    async init() {

    }
    async render() {

        return <>
            <div>
                <label>Hello World</label>
            </div>
        </>;

    }
}

Component.Render(<App args />, ".app");