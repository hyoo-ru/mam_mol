namespace $ {

	export class $mol_atom2 extends $mol_fiber {

		slaves = [] as ( $mol_fiber | number | undefined )[]
		
		rescue( master : $mol_atom2 , cursor : number ) {
			const index = this.masters.length
			master.slaves[ this.masters[ cursor + 1 ] as number + 1 ] = index
			this.masters.push( master , this.masters[ cursor + 1 ] )
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

			if( this.alone ) this.destructor()
		}

		obsolete( index : number ) {

			if( Number.isNaN( this.cursor ) ) {
				
				this.cursor = 0
				this.$.$mol_log( this , '✘' )
				
				this.obsolete_slaves()
			}

			if( index < this.cursor - 2 ) {
				throw new Error( 'Obsoleted while calculation' )
			}

		}

		obsolete_slaves() {
			for( let index = 0 ; index < this.slaves.length ; index += 2 ) {
				const slave = this.slaves[ index ] as $mol_atom2
				if( slave ) slave.obsolete( this.slaves[ index + 1 ] as number )
			}
		}

		get alone() {
			
			for( let index = 0 ; index < this.slaves.length ; index += 2 ) {
				if( this.slaves[ index ] ) return false
			}

			return true
		}
		
	}

}
