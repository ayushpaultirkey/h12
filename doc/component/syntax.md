# Component
### Syntax
&bull; A component scipt must have a `@Component` line anywhere in the file. It is used to tell the         transpiler to transpile this file.

```js
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
```

&bull; The `@Component` line can also be written inside the comment.

```js
import H12 from "./../library/h12.js";

//@Component
class App extends H12.Component {
    constructor() {
        super();
    }
    init() { }
    render() {
        <>
            <div></div>
        </>
    }
}
```

&bull; The return function must have some element.

```js
import H12 from "./../library/h12.js";

//@Component
class App extends H12.Component {
    constructor() {
        super();
    }
    init() { }
    render() {
        <>
            <div></div>
        </>
    }
}
```

#### [◀️ Previous: Component](./../component.md)
#### [▶️ Next: Method](./method.md)
#### [🏛️ Return to Home](./../../README.md)