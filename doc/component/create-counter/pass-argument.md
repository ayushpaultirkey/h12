# Component
### Pass value to other component
In this chapter we will pass value from the parent component to the child component. We will send the starting number to the counter.

- Go to `/public/script/app.js` file, and add key `number` and value to `args` attribute.

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

        return (
            <div>
                <Counter args={{ number: 5 }} />
            </div>
        );

    }
}

H12.Component.Render(<App args />, ".app");
```

- Go to `/public/script/counter.js` file, and add a `args` parameter inside the `init()` function.

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
        this.count = 0;
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
}

export default Counter;
```

- After that set the value of `this.count` to `args.number`.

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
}

export default Counter;
```

#### Now if you check the browser the number will start from 5 instead for 0.

#### In **next chapter** we will call other component's function.

#### [◀️ Previous: Assign property](./assign-property.md)
#### [▶️ Next: Call other component's function](./component-function.md)
#### [🏛️ Return to Home](./../../../README.md)