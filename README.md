
# H12
H12 is a lightweight javascript front-end library inspired from ReactJS that allow using components which can use used around multiple places.

# Usage
H12 Component can work in two ways:

&bull; Without using **H12-Flux** library. In this the component js file will not be transpiled.

&bull; Using **H12-Flux**, the component script will be transpiled and it also support the option to pack the component so the whole component's template will not be builded during rendering.

# Sample
Without using H12 Flux

&bull; **index.html**
````
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="app"></div>
</body>
</html>
<script type="module" src="/test/script/app.js"></script>
````

&bull; **app.js**
````
import Component from "../../component.js";

class App extends Component {
    constructor() {
        super();
    }
    init() {
        this.count = 0;
        this.Set("{*}", "");
        this.Set("{count}", this.count);
        this.Set("{add}", this.add);
    }
    render() {

        return `
            <label>Counter: {count}</label>
            <br/>
            <button onclick="{add}">Add</button>
        `;

    }
    add() {
        this.count++;
        this.Set("{count}", this.count);
    }
}

Component.Render(await Component.Create(App), ".app");
````
&bull; **init()** is called when the component's template is ready to manipulate. But the component is not rendered at this time.

&bull; **render()** function return's the template with key like **{count}**, **{add}**. These will be update when the **Set()** is called.

&bull; **this.Set(key, value)** function updates the value using the key. For example when the key is **{*}** all the key's value will be set to **""**, then the value of **{count}** is set to **this.count** i.e. 0 and then **{add}** key have a function **this.add** which will be added to button's onclick attribute.

&bull; **add()**, a custom function used to increment the value of key **{count}**

&bull; **Component.Render(template, selector)** function renders the template into the specified element.

&bull; **Component.Create(component)** function creates a new component and return the builded template. This function is not mandatory while using **H12-Flux**, since the transpiler will automatically include the function with the component and arguments.