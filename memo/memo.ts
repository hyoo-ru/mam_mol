namespace $ {

	export class $mol_memo extends $mol_wrapper {
		
		static wrap< This extends object , Value >( task : ( this : This , next? : Value )=> Value ) {

			const store = new WeakMap< This , Value >()

			const fun = function( this : This , next? : Value ) {

				if( next === undefined && store.has( this ) ) return store.get( this )
				
				const val = task.call( this , next ) ?? next
				
				store.set( this , val! )
				
				return val

			}

			Reflect.defineProperty( fun , 'name' , { value : task.name + ' ' } )

			return fun
		}
		
	}

}
