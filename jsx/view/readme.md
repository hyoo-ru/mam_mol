# $mol_jsx_view

JSX view base class. 

## Usage example

### Interactive view

```tsx
/** @jsx $mol_jsx_make */

class $my_app extends $mol_jsx_view {

	title = 'Hello'

	change( event : Event ) {
		this.title = 'World'
		this.dom_tree() // force subtree rerender
	}

	dom_render() {
		return <div onclick={ event => this.change( event ) }>{ this.title }</div>
	}

}

$mol_jsx_attach( doc , ()=> <$my_app id="$my_app" /> )
```

```html
<body id="$my_app"></body>
```

After attach:

```html
<div id="$my_app">Hello</div>
```

After click:

```html
<div id="$my_app">World</div>
```

### Reactive view

```tsx
/** @jsx $mol_jsx_make */

class $my_app extends $mol_jsx_view {

	// reactive field
	@ $mol_atom2_field
	title = 'Hello'

	// reactive subtree cache
	@ $mol_atom2_prop
	dom_tree() { return super.dom_tree() }

	// fiberized action
	@ $mol_atom2_method
	change( event : Event ) {
		this.title = 'World'
	}

	dom_render() {
		return <div onclick={ event => this.change( event ) }>{ this.title }</div>
	}

}

$mol_jsx_attach( doc , ()=> <$my_app id="$my_app" /> )
```

[More examples in tests.](make.test.tsx)
