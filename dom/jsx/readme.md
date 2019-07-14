# $mol_dom_jsx

JSX adapter that makes DOM tree. Generates global uniue ids for every dom-element by components tree with ids. Can reuse an existing nodes by guids when used inside `$mol_dom_jsx_attach`.

## Interface

```
( localName : string , props : { [ key : string ] : any } , ...children : Array< Node | string > ) => Element
```

## Usage example

```tsx
namespace $ {
	export function $my_pure_component( props : { id : string } ) { return (
		<div classList={[ 'foo bar' ]} >
			Content is
			<strong id="text_nodes" >
				text nodes
			</strong>
			mixed with
			<strong id="elements" >
				elements
			</strong>
			!
		</div>
	) }
}
```

```html
<body id="$my_app">
	<script>
		$mol_dom_jsx_attach( document , ()=> <$my_pure_component id="$my_app" /> )
	</script>
</body>
```

Result:

```html
<body id="$my_app" class="foo bar" >
	Content is
	<strong id="$my_app.text_nodes" >
		text nodes
	</strong>
	mixed with
	<strong id="$my_app.elements" >
		elements
	</strong>
	!
</body>
```

[More examples in tests.](jsx.test.tsx)
