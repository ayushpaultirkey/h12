# Component
### Tag

Component tag can be used anywhere inside the class to load that component. The tag must have an `args` argument this is used to tell the transpiler that this is a component.

```js
import H12 from "./../library/h12.js";
import Button from "./button.js"

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
                <Button args />
            </div>
        </>;

    }
}

H12.Component.Render(<App args />, ".app");
```

### Passing arguments

The `args` argument must be an object

```js
import H12 from "./../library/h12.js";
import Button from "./button.js"

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
                <Button args={{ link: "/home", title: "Home" }} />
            </div>
        </>;

    }
}

H12.Component.Render(<App args />, ".app");
```

#### [◀️ Previous: Property](./property.md)
#### [▶️ Next: Tag - Syntax](./tag/syntax.md)
#### [🏛️ Return to Home](./../../README.md)