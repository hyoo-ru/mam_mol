# $mol_cookie

Provide get and set methods for document cookies.

## Usage example

```typescript
namespace $ {
	// get value from cookie
	const cookie = $mol_cookie.all()
	const csrftoken = cookie['csrftoken']

	// add value to cookie
	const my_cookie_value = '$mol'
	const cookie = $mol_cookie.all()
	cookie['my_cookie_key'] = my_cookie_value
	$mol_cookie.set(cookie)
}
```

## Properties

**`all() : { [key: string]: string}`**

Returns `document.cookie` as dict.

**`set( cookies: { [key: string]: string} ): string`**

Set `document.cookie` from dict and returns result string.
