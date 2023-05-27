# Component
### Tag - Syntax

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
    async render() {

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

*NOTE:* When adding a component inside any function make sure to make it an `async` function.

#### [◀️ Previous: Tag](./../tag.md)
#### [▶️ Next: Tag - Attribute](./attribute.md)
#### [🏛️ Return to Home](./../../../README.md)