# $mol_dom_jsx

JSX adapter for [$mol_dom_make](../make), that makes DOM tree. If global unique id is provided, uses already exists element with this id from document.

## Interface

```
( localName : string , props : { [ key : string ] : any } , ...children : Array< Node | string > ) => Element
```

## Usage example

```tsx
namespace $ {
	export function $my_pure_component( guid : string ) { return (
		<div id={ guid } className="my_example" >
			Content is
			<strong id={ guid + '.text_nodes' } >
				text nodes
			</strong>
			mixed with
			<strong id={ guid + '.elements' } >
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
		$my_pure_component( '$my_app' )
	</script>
</body>
```

[More examples in tests.](jsx.test.tsx)
