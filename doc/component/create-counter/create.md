# Component
### Create counter component
In this chapter we will create a basic counter that will increment number when the button is clicked.

- If you have created the empty project using `npx h12` command. Go to `/public/script/` folder, and create a new javascript file and name it as `counter.js`. After that import the `h12.js` file and create a class with name `Counter` that extend `H12.Component`.

```javascript
import H12 from "./../library/h12.js";

class Counter extends H12.Component {
    constructor() {
        super();
    }
}
```

- Add `@Component` on top of class, this will tell the transpiler to transpile this file.

```javascript
import H12 from "./../library/h12.js";

@Component
class Counter extends H12.Component {
    constructor() {
        super();
    }
}
```

- Add `init()` and `render()` function that return `<></>`.

```javascript
import H12 from "./../library/h12.js";

@Component
class Counter extends H12.Component {
    constructor() {
        super();
    }
    init() {

    }
    render() {
        return <>

        </>;
    }
}
```

- After that add html template inside the `render()` function with a key `{count}` this key will be used to display number in later chapter.

```javascript
import H12 from "./../library/h12.js";

@Component
class Counter extends H12.Component {
    constructor() {
        super();
    }
    init() {

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
```

- Now export the class `Counter`.

```javascript
import H12 from "./../library/h12.js";

@Component
class Counter extends H12.Component {
    constructor() {
        super();
    }
    init() {

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

#### Our component is now created but still not complete.

#### In **next chapter** we will load this component in the `public/script/app.js` file that is our root component.

#### [◀️ Previous: Tag - Attribute](./../tag/attribute.md)
#### [▶️ Next: Load component](./load.md)
#### [🏛️ Return to Home](./../../../README.md)