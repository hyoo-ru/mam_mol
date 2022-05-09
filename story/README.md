# $mol_story

Tiny undo/redo typescript library for any mutable objects.

## Concepts

- **Story** - Full history (past and future). Contains list of Twists.
- - **Twist** - Atomic changeset. Contains list of Steps to apply and list of steps to rollback.
- - - **Step** - Change of one field of one object to one value.
- - **Draft** - Transaction which can be roll back or committed.
- **Tell** - Action to enable tracking.
- **Skip** - Action to skip tracking.
- **Hero** - Tracked property.

## Usage

```ts
class Obj extends $mol_object2 {

	@ $mol_story_hero // trackable property
	@ $mol_mem // reactive memoizer
	foo( next? : number ) { return next || 1 }

	@ $mol_story_tell.method // tracking enable
	set( next : number ) {
		this.foo( next )
	}

}

// Set the default story
const context = $.$mol_ambient({
	$mol_story_current: new $mol_story
})

const obj = new Obj
obj.$ = context

obj.foo(2) // doesn't track

obj.set(3) // tracks

// Rollback all uncommited steps
// obj.$.$mol_story_current.reset()

// Enforce commit now instead of autocommit after 500ms
obj.$.$mol_story_current.commit()

// Undo
obj.$.$mol_story_current.backward()

// Redo
obj.$.$mol_story_current.forward()
```
