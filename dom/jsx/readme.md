# $mol_dom_jsx

JSX adapter for [$mol_dom_make](../make), that makes DOM tree. If global unique id is provided, uses already exits element with this id in DOM.

## Usage example
```tsx
namespace $ {
	const domElement =
		<div id="example"> <!-- Generate Global Unique IDentifier here -->
			Content is text nodes mixed with
			<strong id="example.strong(0)"> <!-- Generate another GUID here -->
				DOM nodes.
			</strong>
			!
		</div>
}
```

[More examples in tests.](jsx.test.ts)
