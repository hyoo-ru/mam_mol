# $mol_http_resource

Reactive HTTP resource.

## Usage example

```typescript
module $ {
	export interface $my_data {
		login? : string
		password? : string
	} 
	
	export class $my_domain extends $mol_object {
		
		@ $mol_prop()
		text() {
			return $mol_http_resource.item( '//exmaple.org/text.txt' ).text()
		}
		
		@ $mol_prop()
		data( ...diff : $my_data[] ) {
			const uri = '//exmaple.org/data.json'
			const resource = $mol_http_resource_json.item< $my_data >( uri )
			return resource.json( ...diff )
		}
		
		login() {
			return this.data().login
		}
		
		password( ...diff : string[] ) {
			return this.data( ...diff.map( password => ({ password }) ) ).password
		}
		
	}
}
```

## Properties

**`uri() : string`**

URI of resource.

**`text( ...diff : string[] ) : string`**

Text content of resource. Uses 'Get' and 'Put' http requests on getting and setting value.

**`refresh()`**

Reload data from server.

**`uploaded() : boolean`**

Returns true when upload completed. Throws exceptions if any errors occurred.

**`downloader() : $mol_http_request`**

Request for download content.

**`uploader() : $mol_http_request`**

Request for upload content.

# $mol_http_resource_json

**`json< Data >( ...diff : Data[] ) : Data`**

JSON representation of resource.
