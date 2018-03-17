namespace $ {

	declare function requestIdleCallback( handler : ()=> any ) : number

	export type $mol_atom2_status = 'obsolete' | 'check' | 'compute' | 'actual'

	export class $mol_atom2< Value = any , Next = Value > extends $mol_object {

		static slaves = new WeakMap< $mol_fiber , $mol_atom2 >()	

		static roots = new Set< $mol_atom2 >()
		static free = new Set< $mol_atom2 >()

		@ $mol_fiber_method
		static sync() {
			
			for( let atom of this.roots ) {
				atom.value()
				this.roots.delete( atom )
			}
			
			for( let atom of this.free ) {
				atom.reap()
				this.free.delete( atom )
			}
		}
		
		constructor(
			public id : string ,
			public calculate : ( next? : Next )=> Value ,
			public dispose? : ()=> void ,
		) { super() }

		destructor() {
			this.status = 'obsolete'

			const prev = this['value()']
			if( $mol_owning_check( this , prev ) ) prev.destructor()
			this['value()'] = undefined
			
			this.error = undefined

			if( this.pulling ) {
				this.pulling.destructor()
				this.pulling = null
			}

			for( let master of this.masters ) master.dislead( this )
			this.masters = null

			if( this.dispose ) this.dispose()
		}

		status : $mol_atom2_status = 'obsolete'
		pulling : $mol_fiber< Value >
				
		'value()' : Value
		error : Error

		masters = new Set< $mol_atom2 >()
		slaves = new Set< $mol_atom2 >()

		object_id() {
			return this.id
		}

		@ $mol_fiber_method
		value( next? : Next ) {
			$mol_atom2.slaves.set( $mol_fiber.current , this )
			if( next === undefined ) return this.pull()
			else return this.put( next )
		}

		push( next : Value ) {
			const status = this.status
			
			this.error = undefined
			this.status = 'actual'
			this.pulling = null

			const prev = this['value()']

			const value = this.$.$mol_conform( next , prev )
			if( value === prev ) return value

			$mol_log( this , prev , '➔' , value )

			
			this['value()'] = value
			for( let slave of this.slaves ) {
				if( slave.status === 'compute' && status !== 'actual' ) continue
				slave.obsolete()
			}
			
			if( this.pulling ) {
				this.pulling.destructor()
				this.pulling = null
			}

			if( $mol_owning_check( this , prev ) ) prev.destructor()
			
			return this['value()']
		}

		fail( error : Error ) {

			if( error !== $mol_fiber_wait ) {
				const status = this.status
				this.status = 'actual'
				this.pulling = null
				for( let slave of this.slaves ) {
					if( slave.status === 'compute' && status !== 'actual' ) continue
					slave.obsolete()
				}
			}
			
			return this.error = error
		}

		static get current() {
			let fiber = $mol_fiber.current
			let slave

			do {
				slave = $mol_atom2.slaves.get( fiber )
				if( slave ) break
			} while( fiber = fiber.slave )

			return slave
		}

		pull() {
			
			if( !this.pulling ) {

				let fiber = $mol_fiber.current
				let slave

				while( fiber = fiber.slave ) {
					slave = $mol_atom2.slaves.get( fiber )
					if( slave ) break
				}

				if( slave ) {
					this.lead( slave )
					slave.obey( this )
				}

				if( this.status === 'actual' ) {
					if( this.error ) throw this.error
					return this['value()']
				}
				
				this.pulling = $mol_fiber.current
			}

			check : if( this.status === 'check' ) {

				for( let master of this.masters ) {
					
					try {
						master.value()
					} catch( error ) {
						if( error === $mol_fiber_wait ) throw error
						break check
					}

					if( this.status !== 'check' ) break check
				}
				
				this.status = 'actual'
				if( this.error ) throw this.error
				return this['value()']
			}
			
			if( this.status !== 'compute' ) {
				for( let master of this.masters ) master.dislead( this )
				this.masters = new Set<$mol_atom2>()
				this.status = 'compute'
			}

			try {
				
				const res = this.calculate()
				$mol_owning_catch( this , res )
				return this.push( res )

			} catch( error ) {
				if( error !== $mol_fiber_wait ) this.fail( error )
				throw error
			}

		}

		put( next : Next ) {

			const conformed = this.$.$mol_conform( next , this['value()'] ) as any as Value
			if( conformed === this['value()'] ) return conformed

			return this.push( this.calculate( conformed as any as Next ) )

		}

		obsolete() {
			const status = this.status

			if( status === 'obsolete' ) return
			if( status === 'compute' ) return

			this.status = 'obsolete'
			
			if( status === 'check' ) return

			if( this.pulling ) {
				this.pulling.destructor()
				this.pulling = null
			}

			this.restart()
		}

		check() {
			if( this.status !== 'actual' ) return
			this.status = 'check'

			this.restart()
		}

		restart() {
			if( this.slaves.size ) {
				for( let slave of this.slaves ) slave.check()
			} else {
				$mol_atom2.roots.add( this )
				new $mol_defer( ()=> $mol_atom2.sync() )
			}
		}

		reap() {
			if( this.slaves.size > 0 ) return 
			if( this.masters === null ) return

			$mol_log( this , 'reap' )
			this.destructor()
		}

		lead( slave : $mol_atom2 ) {
			this.slaves.add( slave )
		}
		
		dislead( slave : $mol_atom2 ) {
			this.slaves.delete( slave )
			if( !this.slaves.size ) new $mol_defer( ()=> {
				if( this.slaves.size ) return
				$mol_atom2.free.add( this )
				new $mol_defer(()=>$mol_atom2.sync())
			} )
		}
		
		obey( master : $mol_atom2 ) {
			this.masters.add( master )
		}
		
		disobey( master : $mol_atom2 ) {
			this.masters.delete( master )
		}
		
		disobey_all() {
			for( let master of this.masters ) master.dislead( this )
		}

		then< Result = Value >(
			done? : ( next : Value )=> Result ,
			fail? : ( error : Error )=> Result ,
		) : $mol_atom2< Result > {

			const promise = new $mol_atom2( `${ this }.then()` , ()=> {

				try {

					const res = this.value()
					this.dislead( promise )
					return done ? done( res ) : res as any

				} catch( error ) {

					if( error === $mol_fiber_wait ) throw error

					this.dislead( promise )
					
					if( fail ) return fail( error )
					else throw error

				}
				
			} )

			new $mol_defer( ()=> promise.value() )

			return promise
		}

		catch< Result >( fail? : ( error : Error )=> Result ) {
			return this.then( null , fail )
		}

		[ Symbol['observer'] || '@@observer' ]() {
			return this
		}

		subscribe< Result >(
			observer : {
				next : ( next : Value )=> void ,
				error : ( error : Error )=> void ,
				complete : ()=> void ,
			}
		) {

			const subscription = new $mol_atom2(
				`${ this }.subscribe()` ,
				()=> {

					try {

						observer.next( this.value() )
						return null

					} catch( error ) {

						if( error === $mol_fiber_wait ) throw error

						this.dislead( subscription )
						observer.error( error )
						
						throw error
					}
					
				} ,
				()=> observer.complete() ,
			)

			new $mol_defer( ()=> subscription.value() )

			return subscription
		}

		unsubscribe() {
			this.destructor()
		}

		get closed() {
			return !this.masters
		}

	}

}
