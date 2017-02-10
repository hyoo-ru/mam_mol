# $mol_webdav

Reactive WebDAV client.

## Usage example

```typescript
namespace $ {
	
	export class $my_domain extends $mol_object {
		
		@ $mol_mem()
		root() {
			return $mol_webdav.item( 'https://example.org' )
		}
		
		@ $mol_mem()
		files() {
			return this.root().sub()
		}
		
		@ $mol_mem()
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

**`title() : string`**

User friendly title.

**`created() : $jin.time.moment_class`**

Moment of creation.

**`modified() : $jin.time.moment_class`**

Moment of last modification.

**`type() : 'dir'|'file'`**

Type of resource ( file or collection of files).

**`mime() : string`**

Mime-type of file.

**`size() : number`**

Size of file on bytes.

**`version() : string`**

E-tag.
