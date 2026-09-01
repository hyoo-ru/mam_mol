# $mol_one

Universal context-friendly singleton factory.

```ts
	export class $my_session {}
	this.$.$mol_one.$my_session intanceof $my_session
	this.$.$mol_one.$my_session.$ === this.$
	this.$.$mol_one.$my_session.constructor.$ === this.$
	this.$.$mol_one.$my_session === this.$.$mol_one($my_session)
```
