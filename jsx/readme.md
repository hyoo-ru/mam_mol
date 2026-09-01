# $mol_jsx

JSX adapter that makes DOM tree. Generates global unique ids for every DOM-element by components tree with ids. Ensures all local ids are unique. Can reuse an existing nodes by GUIDs when used inside [`$mol_jsx_attach`](https://github.com/hyoo-ru/mam_mol/tree/master/jsx/attach).

## Usage example

```tsx
/** @jsx $mol_jsx */

const $my_message = ( props : { content : string } )=> (
	<div classList={[ 'foo bar' ]} >
		{ props.content } is
		<strong id="/text_nodes" >
			text nodes
		</strong>
		mixed with
		<strong id="/elements" >
			elements
		</strong>
		!
	</div>
)

const dom = (
	<html>
		<body>
			<$my_message id="$my_app" content="Content" />
		</body>
	</html>
)
```

Result:

```html
<html>
	<body>
		<div id="$my_app" class="foo bar" >
			Content is
			<strong id="$my_app/text_nodes" >
				text nodes
			</strong>
			mixed with
			<strong id="$my_app/elements" >
				elements
			</strong>
			!
		</div>
	</body>
</html>
```

[More examples in tests.](https://github.com/hyoo-ru/mam_mol/tree/master/jsx/jsx.test.tsx)

# See also

- [$mol_jsx_attach](https://github.com/hyoo-ru/mam_mol/tree/master/jsx/attach) - render JSX to existing document
- [$mol_jsx_view](https://github.com/hyoo-ru/mam_mol/tree/master/jsx/view) - stateful view bound to DOM-element
