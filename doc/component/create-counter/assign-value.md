# Component
### Assigning value & function to component
In this chapter we will assign value and function to the key of the `counter.js` component.

- Go to `/public/script/counter.js` file, add a `this.count` property and a `Set()` function, this function take key's name and value, when called it will set `{count}` value to `0`.

```javascript
import H12 from "./../library/h12.js";

@Component
class Counter extends H12.Component {
    constructor() {
        super();
    }
    init() {
        this.count = 0;
        this.Set("{count}", this.count);
    }
    render() {
        return <>
            <div>
                <label>Count: {count}</label>
                <button>Add</button>
            </div>
        </>;
    }
}

export default Counter;
```

If you save the file, you can see that in browser `{count}` will be replaced by `0`.

- Add an `onclick` attribute to button and assign a `{add}` key to it.

```javascript
import H12 from "./../library/h12.js";

@Component
class Counter extends H12.Component {
    constructor() {
        super();
    }
    init() {
        this.count = 0;
        this.Set("{count}", this.count);
    }
    render() {
        return <>
            <div>
                <label>Count: {count}</label>
                <button onclick="{add}">Add</button>
            </div>
        </>;
    }
}

export default Counter;
```

- Now lets assign the function to the key of the button. Create a new function `increment()` and increase the value of `this.count`. After that use the `Set()` to assign function to `{add}`.

```javascript
import H12 from "./../library/h12.js";

@Component
class Counter extends H12.Component {
    constructor() {
        super();
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
                <button onclick="{add}">Add</button>
            </div>
        </>;
    }
    increment() {
        this.count++;
    }
}

export default Counter;
```

- Now if you click button, it will still not display the incremented value. It's because we need to update the key's value, that can be done using `Set()` function. So whenever we need to update anything, `Set()` function is called.

```javascript
import H12 from "./../library/h12.js";

@Component
class Counter extends H12.Component {
    constructor() {
        super();
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
                <button onclick="{add}">Add</button>
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

#### Now if you click button, it will increment the value !

#### In **next chapter** we will assign some properties to element.

#### [◀️ Previous: Load component](./load.md)
#### [▶️ Next: Assign property](./assign-property.md)
#### [🏛️ Return to Home](./../../../README.md)