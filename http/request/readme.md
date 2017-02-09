# $mol_http_request

Reactive http request implementation.

## Usage example

```typescript
namespace $ {
	export class $my_saver extends $mol_object {
		
		@ $mol_mem()
		request_put() {
			return new $mol_http_request().setup( obj => {
				obj.method = () => 'Put'
				obj.uri = () => '//example.org'
				obj.body = () => 'Some data'
			} )
		}
	
	}
}
```

```typescript
namespace $ {
	export class $my_data extends $mol_object {
	
		@ $mol_mem()
		request_get() {
			return new $mol_http_request().setup( obj => {
				obj.uri = () => '//example.org'
			} )
		}
		
		@ $mol_mem()
		data() {
			return JSON.parse( this.request_get().text() )
		}
	
	}
}
```

## Properties

**`uri() : string`**

URI of requested resource.

**`method() : string`** 

HTTP method. `"Get"` by default.

**`body() : any`**

Body can be in any format supported by XMLHTTPRequest.

**`response() : XMLHTTPRequest`**

Returns XHR after request completed.

**`text() : string`**

Text, responded from server.
