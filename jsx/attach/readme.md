# $mol_jsx_attach

Defines `$mol_jsx_document` for inner JSX instructions. DOM nodes are reusing from document by GUIDs.

## Usage example

```tsx
/** @jsx $mol_jsx */

const $my_message = ()=> <div>Hello!</div>

$mol_jsx_attach( $mol_dom_context.document , ()=> <$my_message id="$my_app" /> )
```

```html
<body id="$my_app"></body>
```

Result:

```html
<body id="$my_app">Hello!</body>
```
