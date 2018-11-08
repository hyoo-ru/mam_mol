namespace $ {

	export class $mol_atom2< Value = any > extends $mol_fiber< Value > {

		slaves = [] as ( $mol_fiber | number | undefined )[]
		
		rescue( master : $mol_atom2 , cursor : number ) {
			const index = this.masters.length
			master.slaves[ this.masters[ cursor + 1 ] as number + 1 ] = index
			this.masters.push( master , this.masters[ cursor + 1 ] )
		}

		pull() {
			
			if( this.cursor === 0 ) super.pull()

			this.cursor = 0
			const masters = this.masters

			while( this.cursor < masters.length ) {

				const master = masters[ this.cursor ] as $mol_atom2

				if( master ) {
					if( !$mol_compare_any( master.value , master.get() ) ) {
						this.cursor = 0
						return super.pull()
					}
				} else {
					this.cursor += 2
				}

			}

			this.$.$mol_log( this , '✔' , this.value )
			this.cursor = Number.NaN

			return this.value
		}

		complete_master( index : number ) {
			if( this.masters[ index ] instanceof $mol_atom2 ) {
				if( index >= this.cursor ) this.disobey( index )
			} else {
				this.disobey( index )
			}
		}

		obey( master : $mol_fiber , index : number ) : number {
			return master.lead( this , index )
		}

		lead( slave : $mol_fiber , slave_index : number ) {
			
			this.$.$mol_log( this , '☍' )
			
			const index = this.slaves.length
			this.slaves[ index ] = slave
			this.slaves[ index + 1 ] = slave_index
			
			return index
		}

		dislead( index : number ) {
			
			this.$.$mol_log( this , '☌' )

			this.slaves[ index ] = undefined
			this.slaves[ index + 1 ] = undefined

			$mol_array_trim( this.slaves )

			if( this.alone ) this.destructor()
		}

		obsolete( index : number ) {

			if( this.cursor > 0 ) {
				if( index >= this.cursor - 2 ) return
				throw new Error( 'Obsoleted while calculation' )
			}
			
			if( this.cursor === 0 ) return

			this.$.$mol_log( this , '✘' )
			this.cursor = 0
			
			this.doubt_slaves()
		}

		doubt( index : number ) {

			if( this.cursor > 0 ) {
				if( index >= this.cursor - 2 ) return
				throw new Error( 'Doubted while calculation' )
			}

			if( !Number.isNaN( this.cursor ) ) return
				
			this.$.$mol_log( this , '�' )
			this.cursor = Number.NEGATIVE_INFINITY
			
			this.doubt_slaves()
		}

		obsolete_slaves() {
			for( let index = 0 ; index < this.slaves.length ; index += 2 ) {
				const slave = this.slaves[ index ] as $mol_atom2
				if( slave ) slave.obsolete( this.slaves[ index + 1 ] as number )
			}
		}

		doubt_slaves() {
			for( let index = 0 ; index < this.slaves.length ; index += 2 ) {
				const slave = this.slaves[ index ] as $mol_atom2
				if( slave ) slave.doubt( this.slaves[ index + 1 ] as number )
			}
		}

		get alone() {
			
			for( let index = 0 ; index < this.slaves.length ; index += 2 ) {
				if( this.slaves[ index ] ) return false
			}

			return true
		}
		
		get derived() {
			
			for( let index = 0 ; index < this.masters.length ; index += 2 ) {
				if( this.masters[ index ] ) return false
			}

			return true
		}
		
	}

}
