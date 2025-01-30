namespace $ {

	export class $mol_store_mem_web extends $mol_store< Record< string , any > > {
		
		@ $mol_mem
		bus() {
			return new this.$.$mol_bus( '$mol_store_mem', ( [ key, val ]: [ string, any ] )=> {
				console.log(key,val)
				const res = this.value( key, val, 'local' )
				if( val !== undefined ) return
				if( res === undefined ) return
				this.bus().send([ key, res ])
			} )
		}
		
		@ $mol_mem_key
		request< Value >( key: string, next?: Value ) {
			this.bus().send([ key, next ])
		}
		
		@ $mol_mem_key
		value< Value >( key: string, next?: Value, local?: 'local' ) {
			if( !local ) this.request( key, next )
			return super.value( key, next )
		}

	}

	$.$mol_store_mem = new $mol_store_mem_web({})

}
