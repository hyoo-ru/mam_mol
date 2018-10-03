# $mol_ambient

Populates ambient context. By default ambient context is `$` namespace which inherits fields from global context.

All globally defined entities are accessible from context:

```typescript
Promise === $.Promise === $.$$.Promise
```

Ambient context can be overrided in instance:

```typescript
class Foo extends $mol_object2 {
	get logger() {
		return this.$.console // use console from ambient context
	}
}

const foo = Foo.make({
	$ : $.$mol_ambient({ // ambient context override
		console : { // console override
			log : ()=> undefined // noop console.log
		}
	})
})

// another way
const foo2 = new Foo.make({
foo2.$ = $.$mol_ambient({
	console : {
		log : ()=> undefined
	}
})
```
