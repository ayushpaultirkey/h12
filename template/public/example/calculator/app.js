import H12 from "../../library/h12.js";

@Component
class App extends H12.Component {
    constructor() {
        super();
        this.element = {};
    }
    async init() {

        this.Unique("id", this.element);
        this.Set("{add}", this.add);
        this.Set("{sub}", this.subtract);
        this.Set("{mul}", this.multiply);

    }
    async render() {

        return <>
            <div style="display: flex; flex-direction: column; width: 250px;">
                <input type="number" value="0" id="box1" />
                <input type="number" value="0" id="box2" />
                <button onclick="{add}">Add</button>
                <button onclick="{sub}">Subtract</button>
                <button onclick="{mul}">Multiply</button>
                <label>Result: {result}</label>
            </div>
        </>;

    }
    add() {

        let _a = parseFloat(this.element.box1.value);
        let _b = parseFloat(this.element.box2.value);
        
        if(!isNaN(_a) && !isNaN(_b)) {

            this.Set("{result}", (_a + _b));

        };

    }
    subtract() {

        let _a = parseFloat(this.element.box1.value);
        let _b = parseFloat(this.element.box2.value);
        
        if(!isNaN(_a) && !isNaN(_b)) {

            this.Set("{result}", (_a - _b));

        };

    }
    multiply() {

        let _a = parseFloat(this.element.box1.value);
        let _b = parseFloat(this.element.box2.value);
        
        if(!isNaN(_a) && !isNaN(_b)) {

            this.Set("{result}", (_a * _b));

        };

    }
}

H12.Component.Render(<App args />, ".app");