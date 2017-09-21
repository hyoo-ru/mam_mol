# $mol_http

Reactive http request implementation.

## Usage example

```typescript
	users() {
		return $mol_http.resource( 'users.json' ).json() as { name : string }[]
	}
```

```typescript
	user_name( id : string , next? : string ) {
		return $mol_http.resource( `user=${ id }.json` ).json( next && { name : next } ).name
	}
```

## Registry

**`$mol_http.resource( uri : string ) : $mol_http`**

Instances for uri's.

## Properties

**`uri() : string`**

URI of requested resource.

**`method_get() : string`** 

HTTP method for get request. `"Get"` by default.

**`method_put() : string`** 

HTTP method for put request. `"Put"` by default.

**`request() : XMLHTTPRequest`**

Returns native XHR.

**`response() : XMLHTTPRequest`**

Returns native XHR when request is completed.

**`text( next? : string ) : string`**

Text representation of resource content.

**`json< Content >( next? : Content ) : Content`**

JSON representation of resource content.
