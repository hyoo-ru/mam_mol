namespace $ { export class $mol_perf_sierp extends $mol_view {

	/**
	 *  ```
	 *  size_target 25
	 *  ```
	 **/
	size_target() {
		return 25
	}

	/**
	 *  ```
	 *  elapsed?val 0
	 *  ```
	 **/
	@ $mol_mem
	elapsed( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  style * transform <= transform
	 *  ```
	 **/
	style() {
		return ({
			"transform" :  this.transform() ,
		})
	}

	/**
	 *  ```
	 *  transform \
	 *  ```
	 **/
	transform() {
		return ""
	}

	/**
	 *  ```
	 *  sub / <= Dots
	 *  ```
	 **/
	sub() {
		return [ this.Dots() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Dots $mol_view sub <= dots
	 *  ```
	 **/
	@ $mol_mem
	Dots() {
		return (( obj )=>{
			obj.sub = () => this.dots()
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  dots /
	 *  ```
	 **/
	dots() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Dot!id $mol_perf_sierp_dot
	 *  	left <= left!id
	 *  	top <= top!id
	 *  	size <= size!id
	 *  	text <= text
	 *  ```
	 **/
	@ $mol_mem_key
	Dot( id : any ) {
		return (( obj )=>{
			obj.left = () => this.left(id)
			obj.top = () => this.top(id)
			obj.size = () => this.size(id)
			obj.text = () => this.text()
			return obj
		})( new this.$.$mol_perf_sierp_dot(  ) )
	}

	/**
	 *  ```
	 *  left!id 0
	 *  ```
	 **/
	left( id : any ) {
		return 0
	}

	/**
	 *  ```
	 *  top!id 0
	 *  ```
	 **/
	top( id : any ) {
		return 0
	}

	/**
	 *  ```
	 *  size!id 25
	 *  ```
	 **/
	size( id : any ) {
		return 25
	}

	/**
	 *  ```
	 *  text \
	 *  ```
	 **/
	text() {
		return ""
	}

} }

namespace $ { export class $mol_perf_sierp_dot extends $mol_view {

	/**
	 *  ```
	 *  size 25
	 *  ```
	 **/
	size() {
		return 25
	}

	/**
	 *  ```
	 *  size_px \25px
	 *  ```
	 **/
	size_px() {
		return "25px"
	}

	/**
	 *  ```
	 *  hover?val false
	 *  ```
	 **/
	@ $mol_mem
	hover( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  sub / <= text
	 *  ```
	 **/
	sub() {
		return [ this.text() ] as readonly any[]
	}

	/**
	 *  ```
	 *  text \
	 *  ```
	 **/
	text() {
		return ""
	}

	/**
	 *  ```
	 *  style *
	 *  	width <= width
	 *  	height <= height
	 *  	left <= left
	 *  	top <= top
	 *  	borderRadius <= radius
	 *  	lineHeight <= size_px
	 *  	background <= color
	 *  ```
	 **/
	style() {
		return ({
			"width" :  this.width() ,
			"height" :  this.height() ,
			"left" :  this.left() ,
			"top" :  this.top() ,
			"borderRadius" :  this.radius() ,
			"lineHeight" :  this.size_px() ,
			"background" :  this.color() ,
		})
	}

	/**
	 *  ```
	 *  width <= size
	 *  ```
	 **/
	width() {
		return this.size()
	}

	/**
	 *  ```
	 *  height <= size
	 *  ```
	 **/
	height() {
		return this.size()
	}

	/**
	 *  ```
	 *  left 0
	 *  ```
	 **/
	left() {
		return 0
	}

	/**
	 *  ```
	 *  top 0
	 *  ```
	 **/
	top() {
		return 0
	}

	/**
	 *  ```
	 *  radius <= size
	 *  ```
	 **/
	radius() {
		return this.size()
	}

	/**
	 *  ```
	 *  color \
	 *  ```
	 **/
	color() {
		return ""
	}

	/**
	 *  ```
	 *  event *
	 *  	^
	 *  	mouseenter?val <=> enter?val
	 *  	mouseleave?val <=> leave?val
	 *  ```
	 **/
	event() {
		return ({
			...super.event() ,
			"mouseenter" :  ( val? : any )=>  this.enter( val ) ,
			"mouseleave" :  ( val? : any )=>  this.leave( val ) ,
		})
	}

	/**
	 *  ```
	 *  enter?val null
	 *  ```
	 **/
	@ $mol_mem
	enter( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  leave?val null
	 *  ```
	 **/
	@ $mol_mem
	leave( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

} }

