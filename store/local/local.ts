namespace $ {

	export class $mol_store_local_class extends $mol_store< Record< string , any > > {

		@ $mol_mem
		native() {

			check : try {

				const native = $mol_dom_context.localStorage
				if( !native ) break check
				
				native.setItem( '' , '' )
				native.removeItem( '' )
				
				return native

			} catch( error ) {
				
				console.warn( error )

			}

			const dict = new Map< string , string >()

			return {
				map: dict ,
				getItem : ( key : string ) => dict.get( key ) ,
				setItem : ( key : string , value : string )=> dict.set( key , value ) ,
				removeItem : ( key : string )=> dict.delete( key ) ,
			}

		}

		data() {
			return $mol_fail( new Error( 'Forbidden for local storage' ) )
		}

		@ $mol_mem_key
		value< Value >( key : string , next? : Value , force? : $mol_mem_force_cache ) {
			
			if( next === undefined ) return JSON.parse( this.native().getItem( key ) || 'null' )
			
			if( next === null ) this.native().removeItem( key ) 
			else this.native().setItem( key , JSON.stringify( next ) )

			return next
		}

	}

	export let $mol_store_local : $mol_store< Record< string , any > > = new $mol_store_local_class

}
