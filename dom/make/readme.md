# $mol_dom_make

Makes DOM element by ```id```, ```localName``` and ```namespaceURI```. All arguments are optional. If defined ```id```, reuses already exits element with this id from document. Creates HTML:SPAN element by default. 

## Usage example

```typescript
const element = $mol_dom_make( 'example_path' , 'path' , 'http://www.w3.org/2000/svg' )
```

[More examples in tests.](make.test.ts)
