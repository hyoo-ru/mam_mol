# $mol_ambient

Populates ambient context. By default ambient context is `$` namespace which inherits fields from global context.

All globally defined entities are accessible from context:

```typescript
Promise === $.Promise === $.$$.Promise
```

Ambient context can be overridden in instance:

```typescript
class Foo extends $mol_object2 {
	get logger() {
		return this.$.console // use console from ambient context
	}
}

const context_mock = $.$mol_ambient({ // ambient context override
	console : { // console override
		log : ()=> undefined // noop console.log
	}
})

const foo = Foo.create( foo => foo.$ = context_mock )

// another way
const foo2 = new Foo
foo2.$ = context_mock
```

Contexts may be inherited through owning tree:

```
class Bar extends $mol_object2 {
	
	@ $mol_mem
	Foo () { return new Foo }

}

const bar = new Bar
bar.$ = context_mock
bar.Foo().logger.log( 'noop' )
```

Global functions inherits context automatically:

```typescript
function $my_hello( this : $ , name : string ) {
	this.console.log( `Hello, ${ name }!` )
}

// call in context
$.$my_hello( 'Jin' )
```

## Common pitfals

With static classes or singletones use [this.$.$mol_static.$my_class](../static/) or [this.$.$mol_one.$my_class](../one/)
