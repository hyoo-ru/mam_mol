namespace $ { export class $mol_scroll extends $mol_view {

	/**
	 *  ```
	 *  minimal_height 0
	 *  ```
	 **/
	minimal_height() {
		return 0
	}

	/**
	 *  ```
	 *  moving_hor?val false
	 *  ```
	 **/
	@ $mol_mem
	moving_hor( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  moving_vert?val false
	 *  ```
	 **/
	@ $mol_mem
	moving_vert( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  field *
	 *  	^
	 *  	scrollTop <= scroll_top?val
	 *  	scrollLeft <= scroll_left?val
	 *  	scrollBottom <= scroll_bottom?val
	 *  	scrollRight <= scroll_right?val
	 *  ```
	 **/
	field() {
		return ({
			...super.field() ,
			"scrollTop" :  this.scroll_top() ,
			"scrollLeft" :  this.scroll_left() ,
			"scrollBottom" :  this.scroll_bottom() ,
			"scrollRight" :  this.scroll_right() ,
		})
	}

	/**
	 *  ```
	 *  scroll_top?val 0
	 *  ```
	 **/
	@ $mol_mem
	scroll_top( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  scroll_left?val 0
	 *  ```
	 **/
	@ $mol_mem
	scroll_left( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  scroll_bottom?val 0
	 *  ```
	 **/
	@ $mol_mem
	scroll_bottom( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  scroll_right?val 0
	 *  ```
	 **/
	@ $mol_mem
	scroll_right( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  event_async *
	 *  	^
	 *  	scroll?event <=> event_scroll?event
	 *  ```
	 **/
	event_async() {
		return ({
			...super.event_async() ,
			"scroll" :  ( event? : any )=>  this.event_scroll( event ) ,
		})
	}

	/**
	 *  ```
	 *  event_scroll?event null
	 *  ```
	 **/
	@ $mol_mem
	event_scroll( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  Strut $mol_view style * transform <= strut_transform
	 *  ```
	 **/
	@ $mol_mem
	Strut() {
		return (( obj )=>{
			obj.style = () => ({
			"transform" :  this.strut_transform() ,
		})
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  strut_transform \
	 *  ```
	 **/
	strut_transform() {
		return ""
	}

} }

