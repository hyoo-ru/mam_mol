namespace $ { export class $mol_select_demo_month extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Month picker with filter
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_select_demo_month_title" )
	}

	/**
	 *  ```
	 *  sub / <= Month
	 *  ```
	 **/
	sub() {
		return [].concat( this.Month() )
	}

	/**
	 *  ```
	 *  Month $mol_select
	 *  	no_options_message \Not found
	 *  	value?val <=> month?val
	 *  	dictionary <= months
	 *  ```
	 **/
	@ $mol_mem
	Month() {
		return (( obj )=>{
			obj.no_options_message = () => "Not found"
			obj.value = ( val? : any ) => this.month( val )
			obj.dictionary = () => this.months()
			return obj
		})( new this.$.$mol_select(  ) )
	}

	/**
	 *  ```
	 *  month?val \jan
	 *  ```
	 **/
	@ $mol_mem
	month( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : "jan"
	}

	/**
	 *  ```
	 *  months *
	 *  	jan \January
	 *  	feb \February
	 *  	mar \March
	 *  	apr \April
	 *  	may \May
	 *  	jun \June
	 *  	jul \July
	 *  	aug \August
	 *  	sep \September
	 *  	oct \October
	 *  	nov \November
	 *  	dec \December
	 *  ```
	 **/
	months() {
		return ({
			"jan" :  "January" ,
			"feb" :  "February" ,
			"mar" :  "March" ,
			"apr" :  "April" ,
			"may" :  "May" ,
			"jun" :  "June" ,
			"jul" :  "July" ,
			"aug" :  "August" ,
			"sep" :  "September" ,
			"oct" :  "October" ,
			"nov" :  "November" ,
			"dec" :  "December" ,
		})
	}

} }

