# Component
### Loading component
In this chapter we will load the component `Counter` that we created in previous chapter.

- Go to `public/script/` and open `app.js` then import the `counter.js` file.

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
    render() {

        return <>
            <div>
                <label>Hello world</label>
            </div>
        </>;

    }
}

H12.Component.Render(<App args />, ".app");
```

- After that remove the label element and add `Counter` element there. The component tag must have `args` attribute, this contain arguments that is passed to `init()` function when the component is created.

#### *NOTE:* Remember to always add `async` keyword before the function name, whenever adding a component tag.

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
                <Counter args />
            </div>
        </>;

    }
}

H12.Component.Render(<App args />, ".app");
```

#### Now navigate to `http://localhost:3000/public/view/index.html` to see the newly loaded component, but the button will not work because we didn't assigned the event.

#### In **next chapter** we will add value to the key and bind event.

#### [◀️ Previous: Create counter component](./create.md)
#### [▶️ Next: Assign value & function](./assign-value.md)
#### [🏛️ Return to Home](./../../../README.md)