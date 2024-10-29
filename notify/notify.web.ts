namespace $ {
	
	/** Manages system notifications. Notifications of same context are auto joined to one notification. */
	export class $mol_notify_web extends $mol_notify {
		
		@ $mol_mem
		static override allowed( next?: boolean ) {
			
			
			let perm = this.$.$mol_dom_context.Notification.permission
			if( next === undefined ) return perm === 'granted'
			
			if( perm === 'granted' ) return true
			
			perm = $mol_wire_sync( this ).request_permissions()
			
			return perm === 'granted'
		}
		
		static request_permissions() {
			return new Promise< NotificationPermission >( done =>
				this.$.$mol_dom_context.Notification.requestPermission( perm => {
					done( perm )
				} )
			)
		}
		
	}

	$.$mol_notify = $mol_notify_web
	
}
