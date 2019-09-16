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
		this.valueOf() // force subtree rerender
	}

	render() {
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
	valueOf() { return super.valueOf() }

	// fibered action
	@ $mol_fiber.method
	change( event : Event ) {
		this.title = 'World'
	}

	render() {
		return <div onclick={ event => this.change( event ) }>{ this.title }</div>
	}

}

$mol_atom2_autorun( ()=> $mol_jsx_attach( doc , ()=> <$my_app id="$my_app" title="Hola" /> ) )
```

[More examples in tests.](view.test.tsx)
