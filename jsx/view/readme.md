# $mol_jsx_view

Reactive JSX view base class. 

## Usage example

Components with memoized render:

```tsx
/** @jsx $mol_jsx */

class Title extends $mol_jsx_view {
	
	// constant as default
	value() {
		return ''
	}
	
	// render dom
	render() {
		return <h1>{ this.value() }</h1>
	}
	
}

class Button extends $mol_jsx_view {
	
	// empty handler
	activate( event: Event ) { }
	
	// render dom
	render() {
		return (
			<button onclick={ event => this.activate( event ) } >
				{ ... this.childNodes }
			</button>
		)
	}
	
}

class App extends $mol_jsx_view {

	// reactive state
	@ $mol_mem
	title( next = 'Hello' ) {
		return next
	}

	// reactive action
	@ $mol_action
	change( event: Event ) {
		this.title( 'World' )
	}

	// render bound components
	render() {
		return (
			<div>
				<Button
					id="/change"
					activate={ event => this.change( event ) }
					>
					<Title
						id="/word"
						value={ ()=> this.title() }
					/>
				</Button>
			</div>
		)
	}

}
```

Base HTML document:

```html
<body id="/app"></body>
```

Attach component to the document by id:

```ts
$mol_jsx_attach( document, ()=> <App id="/app" /> )
```

Document after attach:

```html
<body id="/app">
	<button id="/app/change">
		<h1 id="/app/word">Hello</h1>
	</button>
</body>
```

Take component instance for element:

```ts
const button = Button.of( document.getElementById( '/app/change' ) )
```

Enforce click event:

```ts
button.activate( new PointerEvent( 'click' ) )
```

Document after click:

```html
<body id="/app">
	<button id="/app/change">
		<h1 id="/app/word">World</h1>
	</button>
</body>
```

[More examples in tests.](view.test.tsx)
