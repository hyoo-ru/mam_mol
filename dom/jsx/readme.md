# $mol_dom_jsx

JSX adapter for [$mol_dom_make](../make), that makes DOM tree. If global unique id is provided, uses already exits element with this id in DOM.

## Interface

```
$mol_dom_jsx(
	localName : string ,
	props : $mol_dom_make_config ,
	...childNodes : Array< Node | string >
) : Element
```

## Usage example

```tsx
namespace $ {
	export function $my_example( guid : string ) { return (
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
		$my_example( '$my_app' )
	</script>
</body>
```

[More examples in tests.](jsx.test.tsx)
