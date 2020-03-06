namespace $ { export class $mol_pop extends $mol_view {

	/**
	 *  ```
	 *  event * keydown?event <=> keydown?event
	 *  ```
	 **/
	event() {
		return ({
			"keydown" :  ( event? : any )=>  this.keydown( event ) ,
		})
	}

	/**
	 *  ```
	 *  keydown?event null
	 *  ```
	 **/
	@ $mol_mem
	keydown( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  showed?val false
	 *  ```
	 **/
	@ $mol_mem
	showed( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  plugins /$mol_plugin <= Meter
	 *  ```
	 **/
	plugins() {
		return [ this.Meter() ] as readonly ( $mol_plugin )[]
	}

	top() {
		return this.Meter().top(  )
	}

	bottom() {
		return this.Meter().bottom(  )
	}

	left() {
		return this.Meter().left(  )
	}

	right() {
		return this.Meter().right(  )
	}

	/**
	 *  ```
	 *  Meter $mol_meter
	 *  	top => top
	 *  	bottom => bottom
	 *  	left => left
	 *  	right => right
	 *  ```
	 **/
	@ $mol_mem
	Meter() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_meter(  ) )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Anchor
	 *  	<= Bubble
	 *  ```
	 **/
	sub() {
		return [ this.Anchor() , this.Bubble() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Anchor null
	 *  ```
	 **/
	Anchor() {
		return null as any
	}

	/**
	 *  ```
	 *  Bubble $mol_pop_bubble
	 *  	align <= align
	 *  	content <= bubble_content
	 *  	height_max <= height_max
	 *  ```
	 **/
	@ $mol_mem
	Bubble() {
		return (( obj )=>{
			obj.align = () => this.align()
			obj.content = () => this.bubble_content()
			obj.height_max = () => this.height_max()
			return obj
		})( new this.$.$mol_pop_bubble(  ) )
	}

	/**
	 *  ```
	 *  align \bottom_center
	 *  ```
	 **/
	align() {
		return "bottom_center"
	}

	/**
	 *  ```
	 *  bubble_content /$mol_view_content
	 *  ```
	 **/
	bubble_content() {
		return [  ] as readonly ( $mol_view_content )[]
	}

	/**
	 *  ```
	 *  height_max 9999
	 *  ```
	 **/
	height_max() {
		return 9999
	}

} }

namespace $ { export class $mol_pop_bubble extends $mol_scroll {

	/**
	 *  ```
	 *  sub <= content
	 *  ```
	 **/
	sub() {
		return this.content()
	}

	/**
	 *  ```
	 *  content /$mol_view_content
	 *  ```
	 **/
	content() {
		return [  ] as readonly ( $mol_view_content )[]
	}

	/**
	 *  ```
	 *  style *
	 *  	^
	 *  	maxHeight <= height_max
	 *  ```
	 **/
	style() {
		return ({
			...super.style() ,
			"maxHeight" :  this.height_max() ,
		})
	}

	/**
	 *  ```
	 *  height_max 9999
	 *  ```
	 **/
	height_max() {
		return 9999
	}

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	mol_pop_align <= align
	 *  	tabindex 0
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"mol_pop_align" :  this.align() ,
			"tabindex" :  0 ,
		})
	}

	/**
	 *  ```
	 *  align \
	 *  ```
	 **/
	align() {
		return ""
	}

} }

