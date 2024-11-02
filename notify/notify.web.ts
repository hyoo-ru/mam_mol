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

	export class $mol_notify_service_web extends $mol_notify_service {
		static override show({ context: title, message: body, uri: data }: $mol_notify_info) {
			const registration = this.$.$mol_service_worker_web.registration()
			const tag = data
			const existen = registration.getNotifications({ tag })
			
			for( const not of existen ) {
				
				if( not.body.indexOf( body ) !== -1 ) body = not.body
				else if( body.indexOf( not.body ) === -1 ) body = not.body + '\n' + body
				
				not.close()
			}
			
			// const vibrate = [ 100, 200, 300, 400, 500 ]
			
			registration.showNotification( title, { body, data, /*vibrate,*/ tag } )

		}

		static override notification( notification: Notification ) {
			const matched = this.$.$mol_service_worker_web.clients_filter({ includeUncontrolled: true, type: 'window' })
			const last = matched.at(-1)

			if( last ) {
				last.focus()
				last.navigate( notification.data )

				return null
			}

			this.$.$mol_service_worker_web.window_open( notification.data )
			return null
		}
	}

	$.$mol_notify_service = $mol_notify_service_web

	$mol_service_plugin.$mol_notify_service = $mol_notify_service_web
}
