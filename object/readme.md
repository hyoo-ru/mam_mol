# $mol_object

The base class for long living objects. Every such object has an unique user friendly id like `$my_app.root(0).List().Task("123")`. This id, is a script simultaneously, by its helping we can get a link to an object from a browser console,
it's very convenience while debugging. To have a correct identifiers, it's recommended to create an object through a factory wrapped by decorator [$mol_mem](../mem) at "owns" object:

```typescript
namespace $ {
	export class $my_app extends $mol_view {
	
		@ $mol_mem
		List() {
			return new $mol_list()
		}
	
	}
}
```
This idetifier is used everywhere, in particular is outputted automatically while [logging](../log):

```
10:16:43 $my_app.root(0).List() pull
10:16:43 $my_app.root(0).List() push [$my_list, undefined]
10:16:44 $my_app.root(0).List().dom_tree() pull
10:16:44 $my_app.root(0).List().dom_tree() push [div, undefined]
```

For outputting own messages into log, it is recommended to use `log` method:

```typescript
namespace $ {
	export class $my_app extends $mol_view {
	
		constructor() {
			this.log([ 'hello' ]) // 10:16:42 $my_app.Root(0) hello
		}
	
	}
}
```
