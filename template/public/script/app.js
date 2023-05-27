import H12 from "./../library/h12.js";

@Component
class App extends H12.Component {
    constructor() {
        super();
        
    }
    init() {

    }
    render() {

        return <>
            <div>
                <label>Hello World</label>
            </div>
        </>;

    }
}


H12.Component.Render(<App args />, ".app");