# $mol_harp_query

[HARP](https://gist.github.com/nin-jin/60545f6dbba22b0e2a1a4e2a3d2528a3) query language wrapper.
It's powerful easy to read and debug graph query language for REST API's.

## Comparison

### Properties

|                                           | HARP   | OData | GraphQL
|-------------------------------------------|--------|-------|--------
| **Single line** query                     | ✅    | ✅    |❌
| Common uri **query string** compatibility | ❌    | ✅    |❌
| **Web Tools** Friendly                    | ✅    | ❌    |❌
| Data **filtering**                        | ✅    | ✅    |❌
| Unlimited filtering **logic**             | ❌    | ✅    |❌
| Data **sorting**                          | ✅    | ✅    |❌
| Data **limiting**                         | ✅    | ✅    |❌
| Data **aggregation**                      | ❌    | ✅    |❌
| **Metadata** query                        | ✅    | ✅    |✅

### Examples

**HARP**

```
/issue[owner=octocat][repository=Hello-World][number=349][title]
```

**OData**

```
/owner(octocat)/repository(Hello-World)/issue(349)?$select=title
```

**GraphGL**

```
{
	repository(owner:"octocat", name:"Hello-World") {
		issue(number:349) {
			id
			title
		}
	}
}
```
