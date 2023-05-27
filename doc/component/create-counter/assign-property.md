# Component
### Assigning property to element
In this chapter we will assign property to element. The properties can use used to assign multiple attribute element at once.

- Go to `/public/script/counter.js` file, add a `this.prop` object inside the `constructor`.

```javascript
import H12 from "./../library/h12.js";

@Component
class Counter extends H12.Component {
    constructor() {
        super();
        this.prop = {};
    }
    init() {
        this.count = 0;
        this.Set("{count}", this.count);
        this.Set("{add}", this.increment);
    }
    render() {
        return <>
            <div>
                <label>Count: {count}</label>
                <button>Add</button>
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

- Add a `style` and set the value as the `Style()` function that have the style's property and value.

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
    init() {
        this.count = 0;
        this.Set("{count}", this.count);
        this.Set("{add}", this.increment);
    }
    render() {
        return <>
            <div>
                <label>Count: {count}</label>
                <button>Add</button>
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

- After that add an attribute inside the button that will use `this.prop` property. The attribute name can be anything for this example we used `inherit`.

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
    init() {
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

#### Now if you check the browser you will have blue color button !

#### In **next chapter** we will pass argument to counter component.

#### [◀️ Previous: Assign value & function](./assign-value.md)
#### [▶️ Next: Pass value to other component](./pass-argument.md)
#### [🏛️ Return to Home](./../../../README.md)