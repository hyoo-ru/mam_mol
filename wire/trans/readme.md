# $mol_wire_trans

Transition atom value

## Usage

```ts
class App extends $mol_object2 {

	@ $mol_wire_solo
	static position_target( next = 0 ) {
		return next
	}

	@ $mol_wire_solo
	static position_current() {
		return $mol_wire_trans( this.position_target() )
	}

	@ $mol_wire_solo
	static render() {
		console.log( this.position_current() )
	}

}

// Render at initial position
App.render()

// Animate fosition to other value
App.position_target( 50 )

// Break animation after 100ms and start new
setTimeout( ()=> App.position_target( 0 ), 100 )
```
