# $mol_dom_jsx

JSX adapter that makes DOM tree. Generates global uniue ids for every dom-element by components tree with ids. Can reuse an existing nodes by guids when used inside `$mol_dom_jsx_attach`.

## Usage example

```tsx
namespace $ {
	
	function $my_message( props : { id : string } ) { return (
		<div classList={[ 'foo bar' ]} >
			Content is
			<strong id="/text_nodes" >
				text nodes
			</strong>
			mixed with
			<strong id="/elements" >
				elements
			</strong>
			!
		</div>
	) }
	
	$mol_dom_jsx_attach( $mol_dom_context.document , ()=> <$my_message id="$my_app" /> )
	
}
```

```html
<body id="$my_app"></body>
```

Result:

```html
<body id="$my_app" class="foo bar" >
	Content is
	<strong id="$my_app/text_nodes" >
		text nodes
	</strong>
	mixed with
	<strong id="$my_app/elements" >
		elements
	</strong>
	!
</body>
```

[More examples in tests.](jsx.test.tsx)
