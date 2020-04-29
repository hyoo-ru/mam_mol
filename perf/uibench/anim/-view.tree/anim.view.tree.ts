namespace $ { export class $mol_perf_uibench_anim extends $mol_view {

	/**
	 *  ```
	 *  state null
	 *  ```
	 **/
	state() {
		return null as any
	}

	/**
	 *  ```
	 *  attr_static *
	 *  	^
	 *  	class \Anim
	 *  ```
	 **/
	attr_static() {
		return ({
			...super.attr_static() ,
			"class" :  "Anim" ,
		})
	}

	/**
	 *  ```
	 *  sub <= boxes
	 *  ```
	 **/
	sub() {
		return this.boxes()
	}

	/**
	 *  ```
	 *  boxes /
	 *  ```
	 **/
	boxes() {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  Box!index $mol_perf_uibench_anim_box state <= box_state!index
	 *  ```
	 **/
	@ $mol_mem_key
	Box( index : any ) {
		return (( obj )=>{
			obj.state = () => this.box_state(index)
			return obj
		})( new this.$.$mol_perf_uibench_anim_box(  ) )
	}

	/**
	 *  ```
	 *  box_state!index null
	 *  ```
	 **/
	box_state( index : any ) {
		return null as any
	}

} }
namespace $ { export class $mol_perf_uibench_anim_box extends $mol_view {

	/**
	 *  ```
	 *  state null
	 *  ```
	 **/
	state() {
		return null as any
	}

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	class \AnimBox
	 *  	data-id <= id
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"class" :  "AnimBox" ,
			"data-id" :  this.id() ,
		})
	}

	/**
	 *  ```
	 *  id \
	 *  ```
	 **/
	id() {
		return ""
	}

	/**
	 *  ```
	 *  style *
	 *  	^
	 *  	borderRadius <= style_radius
	 *  	background <= style_color
	 *  ```
	 **/
	style() {
		return ({
			...super.style() ,
			"borderRadius" :  this.style_radius() ,
			"background" :  this.style_color() ,
		})
	}

	/**
	 *  ```
	 *  style_radius \
	 *  ```
	 **/
	style_radius() {
		return ""
	}

	/**
	 *  ```
	 *  style_color \
	 *  ```
	 **/
	style_color() {
		return ""
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/perf/uibench/anim/-view.tree/anim.view.tree.map