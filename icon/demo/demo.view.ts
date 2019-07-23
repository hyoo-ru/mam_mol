namespace $.$$ {
	export class $mol_icon_demo extends $.$mol_icon_demo {

		@ $mol_mem_key
		Icon( name : string ) {
			return new ( this.$[ name ] as typeof $mol_icon )
		}

		@ $mol_mem_key
		Icon_title( name : string ) {
			return this.$.$mol_dimmer.make({
				needle : ()=> this.icons_filter() ,
				haystack : ()=> name ,
			})
		}

		@ $mol_mem_key
		Icon_description( name : string ) {
			return this.$.$mol_dimmer.make({
				needle : ()=> this.icons_filter() ,
				haystack : ()=> this.data()[ name ] ,
			})
		}

		@ $mol_mem
		icons_all() {
			return Object.keys( this.data() ).map( name => this.Icon( name ) )
		}

		@ $mol_mem
		icons_filtered() {
			const data = this.data()
			return this.icons_all().filter( $mol_match_text( this.icons_filter() , icon => [ icon.constructor.name , data[ icon.constructor.name ] ] ) )
		}

		@ $mol_mem
		records() {
			return this.icons_filtered().map( icon => ({
				icon : icon ,
				name : this.Icon_title( icon.constructor.name ) ,
				description : this.Icon_description( icon.constructor.name ) ,
			}))
		}
		
	}
}
