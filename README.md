# H12
H12 is a lightweight javascript front-end library inspired from ReactJS, that allow using components which can use used around multiple places.

# Installation
Use the `npm install` command to install `H12`

````
npm install h12
````

Then create empty project using the below command

````
npx h12 --create
````

# Syntax
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

# Documentation
#### Will be updated soon...