# Component
### Tag - Attribute

### &bull; `args`

The tag must have an `args` argument this is used to tell the transpiler that this is a component. The `args` argument must be an object.

```js
<Button args={{ link: "/home", title: "Home" }} />
```

### &bull; `scope`

The scope attirbute is used to tell in which component the child component will be stored. For example when adding an item in list from outside the list component it will render child correctly but the list's `child` object will not have that item.

```js
<Button args={{ link: "/home", title: "Home" }} scope={ this.child["list-1"] } />
```

After adding scope the `Button` will be added inside the `list-1` `child` object and not inside the current component's `child`

#### [◀️ Previous: Tag - Syntax](./syntax.md)
#### [▶️ Next: Create counter component](./../create-counter/create.md)
#### [🏛️ Return to Home](./../../../README.md)