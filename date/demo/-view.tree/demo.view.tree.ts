namespace $ { export class $mol_date_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  sub / <= View
	 *  ```
	 **/
	sub() {
		return [this.View()] as readonly any[]
	}

	/**
	 *  ```
	 *  View $mol_view sub /
	 *  	<= Date
	 *  	<= Formatted
	 *  ```
	 **/
	@ $mol_mem
	View() {
		return (( obj )=>{
			obj.sub = () => [this.Date() , this.Formatted()] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Date $mol_date value_moment?val <=> date?val
	 *  ```
	 **/
	@ $mol_mem
	Date() {
		return (( obj )=>{
			obj.value_moment = ( val? : any ) => this.date( val )
			return obj
		})( new this.$.$mol_date(  ) )
	}

	/**
	 *  ```
	 *  date?val $mol_time_moment
	 *  ```
	 **/
	@ $mol_mem
	date( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : (( obj )=>{
			return obj
		})( new this.$.$mol_time_moment(  ) )
	}

	/**
	 *  ```
	 *  Formatted $mol_view sub / <= formatted
	 *  ```
	 **/
	@ $mol_mem
	Formatted() {
		return (( obj )=>{
			obj.sub = () => [this.formatted()] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  formatted \
	 *  ```
	 **/
	formatted() {
		return ""
	}

} }
