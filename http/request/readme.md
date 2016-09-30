# $mol_http_request

Reactive http request implementation.

## Usage example

```typescript
class $my_saver extends $mol_object {
	
	@ $mol_prop()
	requestPut() {
		return new $mol_http_request().setup( obj => {
			obj.method = () => 'Put'
			obj.uri = () => '//example.org'
			obj.body = () => 'Some data'
		} )
	}

}
```

```typescript
class $my_data extends $mol_object {

	@ $mol_prop()
	requestGet() {
		return new $mol_http_request().setup( obj => {
			obj.uri = () => '//example.org'
		} )
	}
	
	@ $mol_prop()
	data() {
		return JSON.parse( this.requestGet().text() )
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
