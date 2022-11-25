# $mol_wire_race

Starts subtasks concurrently instead of serial.

## Example

```ts
class App extends $mol_object2 {

	@ $mol_wire_solo
	static dataLeft( next = 0 ) {
		this.$.$mol_wait_timeout( 1000 )
		return next
	}

	@ $mol_wire_solo
	static dataRight( next = 0 ) {
		this.$.$mol_wait_timeout( 1000 )
		return next
	}

	@ $mol_wire_solo
	static render() {
		try {
			console.log( ... $mol_wire_race(
				()=> this.dataLeft(),
				()=> this.dataRight(),
			) )
		} catch( error ) {
			console.log( error )
			throw error
		}
	}

	static run() {
		this.render() // `Promise` then `0 0` after 1000ms
		this.dataLeft( 1 ) // waits 1000ms
		this.render() // `1 0`
		this.dataRight( 2 ) // waits 1000ms
		this.render() // `1 2`
	}

}

$mol_wire_async( App ).run()
```

[Sandbox](https://eval.js.hyoo.ru/#!code=class%20App%20extends%20%24mol_object2%20%7B%0A%0A%09static%20dataLeft%28%20next%20%3D%200%20%29%20%7B%0A%09%09this.%24.%24mol_wait_timeout%28%201000%20%29%0A%09%09return%20next%0A%09%7D%0A%0A%09static%20dataRight%28%20next%20%3D%200%20%29%20%7B%0A%09%09this.%24.%24mol_wait_timeout%28%201000%20%29%0A%09%09return%20next%0A%09%7D%0A%0A%09static%20render%28%29%20%7B%0A%09%09try%20%7B%0A%09%09%09console.log%28%20...%20%24mol_wire_race%28%0A%09%09%09%09%28%29%3D%3E%20this.dataLeft%28%29%2C%0A%09%09%09%09%28%29%3D%3E%20this.dataRight%28%29%2C%0A%09%09%09%29%20%29%0A%09%09%7D%20catch%28%20error%20%29%20%7B%0A%09%09%09console.log%28%20error%20%29%0A%09%09%09throw%20error%0A%09%09%7D%0A%09%7D%0A%0A%09static%20run%28%29%20%7B%0A%09%09this.render%28%29%20%2F%2F%20%60Promise%60%20then%20%600%200%60%20after%201000ms%0A%09%09this.dataLeft%28%201%20%29%20%2F%2F%20waits%201000ms%0A%09%09this.render%28%29%20%2F%2F%20%601%200%60%0A%09%09this.dataRight%28%202%20%29%20%2F%2F%20waits%201000ms%0A%09%09this.render%28%29%20%2F%2F%20%601%202%60%0A%09%7D%0A%0A%7D%0A%24mol_wire_solo%28%20App%2C%20'dataLeft'%20%29%0A%24mol_wire_solo%28%20App%2C%20'dataRight'%20%29%0A%24mol_wire_solo%28%20App%2C%20'render'%20%29%0A%0A%24mol_wire_async%28%20App%20%29.run%28%29/run=true)
