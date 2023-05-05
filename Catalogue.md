# v1.0.7
&bull; **Date: 05-May-2023**

#### Updated **/public/library/h12/component.js**

&bull; Component.__render() function is removed, the rendering will be done using Component.Render() function.

&bull; Component.child and Component.parent object added to get the child and the parent components.

&bull; Component.id created to create reference in the child or parent object of component

&bull; Updated Component.__build_document() function, instead of matching key in attribute using regex now the getAttributeNames() function is used to get all attrbiutes and their value. Now if the attribute is the key then it will also be stored.

&bull; Binding type update, type 0 = innerhtml, type 1 = attributes's value, type 2 = attribute name.

&bull; after() function created, it will called when the component is rendered.

&bull; Component.Set() function updated, now the attributes that are key can also be updated and can also contain key as a value.

&bull; Component.Render() function updated, the first argument is the object that have { template, component }. It will call after() function when the component is rendered.

&bull; Component.Create() function updated, it will now return { template, component }, and aslo set the id for the component if the _argument have id key and will also set parent and child.

#### Updated **/public/script/app.js**

&bull; ([]) syntax was changed to () for rendering template.

#### Updated **/template/app.js**

&bull; Updated /@h12 path

#### Updated **/src/serve.js**

#### Updated **/src/transpiler.js**

&bull; ([]) pattern capturing was changed to ().

&bull; Updated h12c.Create() function syntax since it now return an object.