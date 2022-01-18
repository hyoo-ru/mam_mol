namespace $ {
	export class $mol_wire_set< Value > extends Set< Value > {

		pub = new $mol_wire_pub
		
		// Accessors
		
		has( value: Value ) {
			this.pub.track_promote()
			return super.has( value )
		}
		
		entries() {
			this.pub.track_promote()
			return super.entries()
		}
		
		keys() {
			this.pub.track_promote()
			return super.keys()
		}
		
		values() {
			this.pub.track_promote()
			return super.values()
		}
		
		forEach(
			task: ( value: Value, value2: Value, set: Set< Value > ) => void,
			self?: any
		) {
			this.pub.track_promote()
			super.forEach( task, self )
		}
		
		[Symbol.iterator]() {
			this.pub.track_promote()
			return super[Symbol.iterator]()
		}
		
		get size() {
			this.pub.track_promote()
			return super.size	
		}

		// Mutators

		add( value: Value ) {
			if( super.has( value ) ) return this
			super.add( value )
			this.pub.emit()
			return this
		}

		delete( value: Value ) {
			const res = super.delete( value )
			if( res ) this.pub.emit()
			return res
		}
		
		clear() {
			if( !super.size ) return
			super.clear()
			this.pub.emit()
		}

	}

}
