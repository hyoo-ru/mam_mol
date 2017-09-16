# $mol_webdav

Reactive WebDAV client.

## Usage example

```typescript
namespace $ {
	
	export class $my_domain extends $mol_object {
		
		@ $mol_mem
		root() {
			return $mol_webdav.item( 'https://example.org' )
		}
		
		@ $mol_mem
		files() {
			return this.root().sub()
		}
		
		@ $mol_mem
		titles() {
			return this.files().map( file => file.title() )
		}
		
	}
	
}
```

## Properties

**`uri() : string`**

URI of resource.

**`sub() : $mol_webdav[]`**

List of subresources.

**`prop( name : string ) : string`**

String value of named resource property. 

**`type() : 'dir'|'file'`**

Type of resource ( file or collection of files).
