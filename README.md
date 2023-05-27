# H12 🦋
H12 is a lightweight javascript front-end library inspired from ReactJS, that allow using components which can use used around multiple places.

# Index 📗
- [About](./doc/about.md)
- [Installation](./doc/installation.md)
- [Creating & running empty project](./doc/create-project.md)
- [Component](./doc/component.md)
    - [Syntax](./doc/component/syntax.md)
    - [Method](./doc/component/method.md)
    - [Property](./doc/component/property.md)
    - [Tag](./doc/component/tag.md)
        - [Syntax](./doc/component/tag/syntax.md)
        - [Attribute](./doc/component/tag/attribute.md)
    - Example
        - [Create counter component](./doc/component/create-counter/create.md)
        - [Load component](./doc/component/create-counter/load.md)
        - [Assign value & function](./doc/component/create-counter/assign-value.md)
        - [Assign property to element](./doc/component/create-counter/assign-property.md)
        - [Pass value to other component](./doc/component/create-counter/pass-argument.md)
        - [Call other component's function](./doc/component/create-counter/component-function.md)

# Installation 📥
Use the `npm` install command to install the H12.
````
npm install h12
npx h12 --create
````

# Syntax 📜

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