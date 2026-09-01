namespace $ {
	
	/** Watch and logs reactive states. Logger automatically added to test bundle which is adding to `test.html`. */
	export class $mol_wire_log extends $mol_object2 {
		
		@ $mol_mem
		static watch( task?: ()=> any ) {
			return task
		}
		
		@ $mol_mem_key
		static track( fiber: $mol_wire_fiber< any, any, any > ) {
			
			const prev = $mol_wire_probe( ()=> this.track( fiber ) )
			let next: any
			
			try {
				next = fiber.sync()
			} finally {
				
				for( const pub of fiber.pub_list ) {
					if( pub instanceof $mol_wire_fiber ) {
						this.track( pub )
					}
				}
				
			}
			
			if( fiber.host === this ) return next
			
			if( $mol_compare_deep( prev, next ) ) {
				
				this.$.$mol_log3_rise({
					message: '💧 Same',
					place: fiber,
				})
				
			} else if( prev !== undefined ) {
				
				this.$.$mol_log3_rise({
					message: '🔥 Next',
					place: fiber,
					prev,
				})
				
			}
		
			return next
		}
		
		@ $mol_mem
		static active() {
			
			try {
				this.watch()?.()
			} catch( error ) {
				$mol_fail_log( error )
			} finally {
				for( const pub of ( $mol_wire_auto() as $mol_wire_fiber< any, any, any > ).pub_list ) {
					if( pub instanceof $mol_wire_fiber ) {
						this.track( pub )
					}
				}
			}
			
		}
		
	}
	
}
