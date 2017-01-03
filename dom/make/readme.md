# $mol_dom_make

Makes DOM element by target values of fields. Id field is requires, all other fields are optional. Uses already exits element with this id in DOM.

## Usage example
```typescript
namespace $ {
	const domElement = $mol_dom_make({
		id : 'example' , // Generate Global Unique IDentifier here
		tagName : 'div' , // DIV is default
		namespaceURI : 'http://www.w3.org/1999/xhtml' , // XHTML NS is default
		childNodes : [ // by default childNodes will not be changed
			'Array of strings mixed with ' ,
			{
				id : 'example.strong(0)' , // generate another GUID here
				tagName : 'strong' ,
				childNodes : [
					'DOM nodes.'
				]
			} ,
			'!' ,
		]
	})
}
```

[More examples in tests.](make.test.ts)
