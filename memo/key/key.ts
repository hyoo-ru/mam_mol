namespace $ {
	export class $mol_memo_key extends $mol_wrapper {
		
		static wrap< This extends object, Key, Value >(
			task: ( this: This, key: Key, next?: Value )=> Value
		) {
			
			const store = new WeakMap< This, Map< string, Value > >()
			
			const fun = function( this: This, key: Key, next?: Value ) {
				
				let store2 = store.get( this ?? fun )
				if( !store2 ) store.set( this ?? fun, store2 = new Map )
				
				const key_str = $mol_key( key )
				
				if( next === undefined && store2.has( key_str ) ) return store2.get( key_str )
				
				const val = task.call( this, key, next ) ?? next
				
				store2.set( key_str, val! )
				
				return val
				
			}
			
			Reflect.defineProperty( fun , 'name' , { value : task.name + ' ' } )
			
			return fun
		}
		
	}
}
