# $mol_wire_easing

Transition atom value

## Usage

```ts
class App extends $mol_object2 {

	@ $mol_wire_solo
	static visible( next ) {
		if( next === undefined ) return false
		if( next ) {
			this.opacity( 100 )
		} else {
			this.opacity( 0 )
			this.$.$mol_wait_timeout(200)
		}
		return next
	}

	@ $mol_wire_solo
	static opacity( next = 0 ) {
		return next
	}

	@ $mol_wire_solo
	static opacity_anim() {
		return Math.floor(
			$mol_wire_easing(
				this.opacity()
			)
		)
	}

	@ $mol_wire_solo
	static render() {
		console.log(
			'visible=', this.visible(),
			' opacity=', this.opacity_anim(), '%',
		)
	}

}

// Render invisible
App.render()

// Make visible and fade in
App.visible( true )

// Break fade in after 100ms and fade out then make invisible
setTimeout( ()=> App.visible( false ), 150 )
```

[Sandbox](https://eval.js.hyoo.ru/#!code=class%20App%20extends%20%24mol_object2%20%7B%0A%0A%09static%20visible%28%20next%20%29%20%7B%0A%09%09if%28%20next%20%3D%3D%3D%20undefined%20%29%20return%20false%0A%09%09if%28%20next%20%29%20%7B%0A%09%09%09this.opacity%28%20100%20%29%0A%09%09%7D%20else%20%7B%0A%09%09%09this.opacity%28%200%20%29%0A%09%09%09this.%24.%24mol_wait_timeout%28200%29%0A%09%09%7D%0A%09%09return%20next%0A%09%7D%0A%0A%09static%20opacity%28%20next%20%3D%200%20%29%20%7B%0A%09%09return%20next%0A%09%7D%0A%0A%09static%20opacity_anim%28%29%20%7B%0A%09%09return%20Math.floor%28%0A%09%09%09%24mol_wire_easing%28%0A%09%09%09%09this.opacity%28%29%0A%09%09%09%29%0A%09%09%29%0A%09%7D%0A%0A%09static%20render%28%29%20%7B%0A%09%09console.log%28%0A%09%09%09'visible%3D'%2C%20this.visible%28%29%2C%0A%09%09%09'%20opacity%3D'%2C%20this.opacity_anim%28%29%2C%20'%25'%2C%0A%09%09%29%0A%09%7D%0A%0A%7D%0A%24mol_wire_solo%28%20App%2C%20'visible'%20%29%0A%24mol_wire_solo%28%20App%2C%20'opacity'%20%29%0A%24mol_wire_solo%28%20App%2C%20'opacity_anim'%20%29%0A%24mol_wire_solo%28%20App%2C%20'render'%20%29%0A%0A%2F%2F%20Render%20invisible%0AApp.render%28%29%0A%0A%2F%2F%20Make%20visible%20and%20fade%20in%0AApp.visible%28%20true%20%29%0A%0A%2F%2F%20Break%20fade%20in%20after%20100ms%20and%20fade%20out%20then%20make%20invisible%0AsetTimeout%28%20%28%29%3D%3E%20App.visible%28%20false%20%29%2C%20150%20%29%0A/run=true)
