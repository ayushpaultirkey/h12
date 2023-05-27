# Component
### Methods
### &bull; `init(args)`

This function is called when the component's template is builded or in other word, the component is ready to be rendered. The key's value can be changed at this stage. It can also have `args` argument that is passed when the new component is created, it is used to send data to other component before loading it.

*NOTE:* When adding a component inside the template make sure to add `async` keyword before the `init()` ie. `async init()`.

### &bull; `render()`

The render function have a html template that can have multiple keys or other components. The template must be inside `<></>` tags.

*NOTE:* When adding a component inside the template make sure to add `async` keyword before the `init()` ie. `async init()`.

### &bull; `Set(key, value)`

This function updates the key's value and all the elements that have that key, it take the key's name that is `string` and it's value that can be any `number`, `function` or `string`.

*Example:* `this.Set("{age}", 21);`

### &bull; `Get(key)`

This function is used to get the value of the key, it take the key's name that is `string` and return's its value.

*Example:* `this.Get("{age}");`

### &bull; `Unique(attribute, object)`

This function get all the elements via `attribute` and store them inside the `object`. It can use used to avoid id's collision after loading same component multiple time. The `attribute` is `string` and the `object` is `object`

*Example:* `this.Unique("id", this.element);`

### &bull; `Style(property)`

This function is used to return a style string by using the `property` that is `object`.

*Example:* `this.Style({ "color": "red", "background-color": "black" });`

#### [◀️ Previous: Syntax](./syntax.md)
#### [▶️ Next: Property](./property.md)
#### [🏛️ Return to Home](./../../README.md)