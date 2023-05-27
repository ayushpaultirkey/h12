# Index
&bull; About

&bull; Installation

&bull; Creating Empty Project

&bull; Component

&bull; Component - Structure

&bull; Component - Functions

# About

# Installation
Use the npm command to install the H12.
````
npm install h12
````

# Creating Empty Project
An empty project can be created using the *npx h12* command, this will create few folders with h12 library and a server file.

````
npx h12
````

After running the command, *public* folder with 3 subfolder *library*, *script*, and *view* will appear. And also an *app.js* file, that is used to start the server. The H12 library is located inside */public/library/h12*.

# Run
After creating project, use the *npm start* command to start the server and navigate to **http://localhost:3000/public/view/index.html**

````
npm start
````

# Component
Components are small templates that are loaded when they are called, they can also have *HTML* embedded in it like *ReactJS*. Component's template or html part have a **key** that are witten as **{key_name}** inside the html part. These can be used to manipulate attribute's name, value or the element's inner html. Whenever the key's value is updated, instead of updating whole component, all the elements that have that key will be updated.


# Component - Structure
Go to */public/script/app.js* file, this the main component file that will be rendered when the page is loaded, it will look something like this.

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

&bull; **render()**, this function return html template that can have keys or other components in it. The template should be written inside the **()** brackets.

# Component - Functions
&bull; **init(_args)**, this function is called when the component's template is builded or in other word, the component is ready to be rendered. The key's value can be set at this stage. It also have **_args** argument that is passed when the new component is created, it can be used to send data to other component before loading it.

*NOTE:* When adding a component inside the template make sure to add **async** keyword before the **init()** ie. **async init()**.

&bull; **render()**, this function return html template that can have keys or other components in it. The template should be written inside the **()** brackets.

*NOTE:* When adding a component inside the template make sure to add **async** keyword before the **render()** ie. **async render()**.

&bull; **after()**, this function is called when the component is loaded.

&bull; **this.Set(_key, _value)**, this function updates the key's value, it take the key's name that is *string* and it's value. The value can be any *number*, *function* or *string*.

*Example:* this.Set("{age}", 21);

&bull; **this.Get(_key)**, this function is used to get the value of the key, it take the key's name and return's its value.

*Example:* this.Get("{age}");

# Component - Property
&bull; **this.child**, an object that store all the child component's in it.

&bull; **this.parent**, an object that store the current component's parent.

&bull; **this.id**, used to set the ID for the component, must be called inside *constructor()*.