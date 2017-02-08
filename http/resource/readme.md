# $mol_http_resource

Reactive HTTP resource.

## Usage example

```typescript
namespace $ {
	
	export interface $my_domain_data {
		login? : string
		password? : string
	} 
	
	export class $my_domain extends $mol_object {
		
		@ $mol_mem()
		text() {
			return $mol_http_resource.item( '//exmaple.org/text.txt' ).text()
		}
		
		@ $mol_mem()
		data( next? : $my_data ) {
			const uri = '//exmaple.org/data.json'
			const resource = $mol_http_resource_json.item< $my_domain_data >( uri )
			return resource.json( next )
		}
		
		login() {
			return this.data().login
		}
		
		password( next? : string ) {
			return this.data( next && { password : next } ).password
		}
		
	}
}
```

## Properties $mol_http_resource

**`uri() : string`**

URI of resource.

**`text( next? : string ) : string`**

Text content of resource. Uses 'Get' and 'Put' http requests on getting and setting value.

### Properties of $mol_http_resource_json

**`json< Data >( next? : Data ) : Data`**

JSON representation of resource.
