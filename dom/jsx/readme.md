# $mol_dom_jsx

JSX adapter for [$mol_dom_make](../make), that makes DOM tree. If global unique id is provided, uses already exists element with this id from document.

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

[More examples in tests.](jsx.test.tsx)
