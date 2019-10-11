namespace $ { export class $mol_check_group_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Group of checkboxes
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_check_group_demo_title" )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= All
	 *  	<= Partial
	 *  ```
	 **/
	sub() {
		return [].concat( this.All() , this.Partial() )
	}

	/**
	 *  ```
	 *  All $mol_check_group
	 *  	title \SPECIAL
	 *  	checks /
	 *  		<= Strength
	 *  		<= Perception
	 *  		<= Endurance
	 *  		<= Charisma
	 *  		<= Intelligence
	 *  		<= Agility
	 *  		<= Luck
	 *  ```
	 **/
	@ $mol_mem
	All() {
		return (( obj )=>{
			obj.title = () => "SPECIAL"
			obj.checks = () => [].concat( this.Strength() , this.Perception() , this.Endurance() , this.Charisma() , this.Intelligence() , this.Agility() , this.Luck() )
			return obj
		})( new this.$.$mol_check_group(  ) )
	}

	/**
	 *  ```
	 *  Partial $mol_list rows /
	 *  	<= Strength
	 *  	<= Perception
	 *  	<= Endurance
	 *  	<= Charisma
	 *  	<= Intelligence
	 *  	<= Agility
	 *  	<= Luck
	 *  ```
	 **/
	@ $mol_mem
	Partial() {
		return (( obj )=>{
			obj.rows = () => [].concat( this.Strength() , this.Perception() , this.Endurance() , this.Charisma() , this.Intelligence() , this.Agility() , this.Luck() )
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  Strength $mol_check_box
	 *  	title <= strength_title
	 *  	checked?val <=> strength?val
	 *  ```
	 **/
	@ $mol_mem
	Strength() {
		return (( obj )=>{
			obj.title = () => this.strength_title()
			obj.checked = ( val? : any ) => this.strength( val )
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

	/**
	 *  ```
	 *  strength_title \Strength
	 *  ```
	 **/
	strength_title() {
		return "Strength"
	}

	/**
	 *  ```
	 *  strength?val false
	 *  ```
	 **/
	@ $mol_mem
	strength( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  Perception $mol_check_box
	 *  	title <= perception_title
	 *  	checked?val <=> perception?val
	 *  ```
	 **/
	@ $mol_mem
	Perception() {
		return (( obj )=>{
			obj.title = () => this.perception_title()
			obj.checked = ( val? : any ) => this.perception( val )
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

	/**
	 *  ```
	 *  perception_title \Perception
	 *  ```
	 **/
	perception_title() {
		return "Perception"
	}

	/**
	 *  ```
	 *  perception?val true
	 *  ```
	 **/
	@ $mol_mem
	perception( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : true
	}

	/**
	 *  ```
	 *  Endurance $mol_check_box
	 *  	title <= endurance_title
	 *  	checked?val <=> endurance?val
	 *  ```
	 **/
	@ $mol_mem
	Endurance() {
		return (( obj )=>{
			obj.title = () => this.endurance_title()
			obj.checked = ( val? : any ) => this.endurance( val )
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

	/**
	 *  ```
	 *  endurance_title \Endurance
	 *  ```
	 **/
	endurance_title() {
		return "Endurance"
	}

	/**
	 *  ```
	 *  endurance?val false
	 *  ```
	 **/
	@ $mol_mem
	endurance( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  Charisma $mol_check_box
	 *  	title <= charisma_title
	 *  	checked?val <=> charisma?val
	 *  ```
	 **/
	@ $mol_mem
	Charisma() {
		return (( obj )=>{
			obj.title = () => this.charisma_title()
			obj.checked = ( val? : any ) => this.charisma( val )
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

	/**
	 *  ```
	 *  charisma_title \Charisma
	 *  ```
	 **/
	charisma_title() {
		return "Charisma"
	}

	/**
	 *  ```
	 *  charisma?val false
	 *  ```
	 **/
	@ $mol_mem
	charisma( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  Intelligence $mol_check_box
	 *  	title <= intelligence_title
	 *  	checked?val <=> intelligence?val
	 *  ```
	 **/
	@ $mol_mem
	Intelligence() {
		return (( obj )=>{
			obj.title = () => this.intelligence_title()
			obj.checked = ( val? : any ) => this.intelligence( val )
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

	/**
	 *  ```
	 *  intelligence_title \Intelligence
	 *  ```
	 **/
	intelligence_title() {
		return "Intelligence"
	}

	/**
	 *  ```
	 *  intelligence?val true
	 *  ```
	 **/
	@ $mol_mem
	intelligence( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : true
	}

	/**
	 *  ```
	 *  Agility $mol_check_box
	 *  	title <= agility_title
	 *  	checked?val <=> agility?val
	 *  ```
	 **/
	@ $mol_mem
	Agility() {
		return (( obj )=>{
			obj.title = () => this.agility_title()
			obj.checked = ( val? : any ) => this.agility( val )
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

	/**
	 *  ```
	 *  agility_title \Agility
	 *  ```
	 **/
	agility_title() {
		return "Agility"
	}

	/**
	 *  ```
	 *  agility?val true
	 *  ```
	 **/
	@ $mol_mem
	agility( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : true
	}

	/**
	 *  ```
	 *  Luck $mol_check_box
	 *  	title <= luck_title
	 *  	checked?val <=> luck?val
	 *  ```
	 **/
	@ $mol_mem
	Luck() {
		return (( obj )=>{
			obj.title = () => this.luck_title()
			obj.checked = ( val? : any ) => this.luck( val )
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

	/**
	 *  ```
	 *  luck_title \Luck
	 *  ```
	 **/
	luck_title() {
		return "Luck"
	}

	/**
	 *  ```
	 *  luck?val true
	 *  ```
	 **/
	@ $mol_mem
	luck( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : true
	}

} }

