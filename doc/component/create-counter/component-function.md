# Component
### Calling other component's function
In this chapter we will call component's function from other component. We will create a button in parent component that will call counter's function and will reset it's value to 0.

- Go to `/public/script/counter.js` file, and add a `reset()` and set the `this.count` to `0` after that call `Set()` function.

```javascript
import H12 from "./../library/h12.js";

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

```

- After that go to `/public/script/app.js` file, and add an `id` key inside the `args` attribute of the Counter tag. So that we can access this component later on.

```javascript
import H12 from "./../library/h12.js";
import Counter from "./counter.js";

@Component
class App extends H12.Component {
    constructor() {
        super();
    }
    init() {

    }
    async render() {

        return <>
            <div>
                <Counter args={{ id: "counter-1", number: 5 }} />
            </div>
        </>;

    }
}

H12.Component.Render(<App args />, ".app");
```

- After that and add a button element after the counter tag and add a onclick attribute that have `{click}` key in it.

```javascript
import H12 from "./../library/h12.js";
import Counter from "./counter.js";

@Component
class App extends H12.Component {
    constructor() {
        super();
    }
    init() {

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
}

H12.Component.Render(<App args />, ".app");
```

- Now call the `Set()` from `init()` and set the `click` function.

```javascript
import H12 from "./../library/h12.js";
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
}

H12.Component.Render(<App args />, ".app");
```

- Create a `click()` function and call the counter's function by using the `child` object then call the `reset()` function.

```javascript
import H12 from "./../library/h12.js";
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
```

*NOTE:* All the components that are present are stored inside the `child` object and the counter component will have a `parent` object that will have `App` object.

#### Now if you click the Reset button the value will be changed to 0.

#### [◀️ Previous: Pass value to other component](./pass-argument.md)
#### [🏛️ Return to Home](./../../../README.md)