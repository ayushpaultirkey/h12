# Component - Structure
If you have created the empty project. Go to `/public/script/app.js` file, this the main component file that will be rendered when the page is loaded, it will look something like this.

```javascript
import H12 from "./../library/h12.js";

@Component
class App extends H12.Component {
    constructor() {
        super();
    }
    init() {

    }
    render() {

        return (
            <div>
                <label>Hello world</label>
            </div>
        );

    }
}

H12.Component.Render(<App args />, ".app");
```

&bull; **init()**, this function is called when the component's template is builded or in other word, the component is ready to be rendered. The key's value can be set at this stage.

&bull; **render()**, this function return html template that can have keys or other components in it. The template should be written inside the `()` brackets.
