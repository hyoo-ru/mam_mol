namespace $ {
	
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
			
			if( prev !== undefined && !$mol_compare_deep( prev, next ) ) {
				this.$.$mol_log3_rise({
					message: 'Changed',
					place: fiber,
				})
			}
		
			return next
		}
		
		@ $mol_mem
		static active() {
			
			try {
				this.watch()?.()
			} finally {
				for( const pub of ( $mol_wire_auto as $mol_wire_fiber< any, any, any > ).pub_list ) {
					if( pub instanceof $mol_wire_fiber ) {
						this.track( pub )
					}
				}
			}
			
		}
		
	}
	
}
