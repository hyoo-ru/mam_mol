# $mol_jsx_view

JSX view base class. 

## Usage example

### Interactive view

```tsx
/** @jsx $mol_jsx */

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
/** @jsx $mol_jsx */

class $my_app extends $mol_jsx_view {

	// reactive channel
	@ $mol_mem
	title( next = 'Hello' ) {
		return next
	}

	// fibered action
	@ $mol_action
	change( event: Event ) {
		this.title( 'World' )
	}

	render() {
		return <div onclick={ event => this.change( event ) }>{ this.title() }</div>
	}

}

// enable autorun render in right context
$mol_mem( $my_app.prototype, 'valueOf' )

$mol_jsx_attach( doc , ()=> <$my_app id="$my_app" title="Hola" /> )
```

[More examples in tests.](view.test.tsx)
