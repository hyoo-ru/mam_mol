namespace $ {
	/** reactive Dictionary */
	export class $mol_wire_dict< Key, Value > extends Map< Key, Value > {

		pub = new $mol_wire_pub
		
		// Accessors
		
		has( key: Key ) {
			this.pub.promote()
			return super.has( key )
		}
		
		get( key: Key ) {
			this.pub.promote()
			return super.get( key )
		}
		
		entries() {
			this.pub.promote()
			return super.entries()
		}
		
		keys() {
			this.pub.promote()
			return super.keys()
		}
		
		values() {
			this.pub.promote()
			return super.values()
		}
		
		forEach(
			task: ( value: Value, key: Key, dict: Map< Key, Value > ) => void,
			self?: any
		) {
			this.pub.promote()
			super.forEach( task, self )
		}
		
		[Symbol.iterator]() {
			this.pub.promote()
			return super[Symbol.iterator]()
		}
		
		get size() {
			this.pub.promote()
			return super.size	
		}

		// Mutators

		set( key: Key, value: Value ) {
			if( super.get( key ) === value ) return this
			super.set( key, value )
			this.pub?.emit() // undefined in constructor
			return this
		}

		delete( key: Key ) {
			const res = super.delete( key )
			if( res ) this.pub.emit()
			return res
		}
		
		clear() {
			if( !super.size ) return
			super.clear()
			this.pub.emit()
		}
		
		// Extensions
		
		item( key: Key, next?: Value | null ) {
			
			if( next === undefined ) return this.get( key ) ?? null
			
			if( next === null ) this.delete( key )
			else this.set( key, next )
			
			return next
		}

	}

}
