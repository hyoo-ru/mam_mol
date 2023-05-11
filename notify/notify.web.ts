namespace $ {
	
	/** Manages system notifications. Notifications of same context are auto joined to one notification. */
	export class $mol_notify {
		
		@ $mol_mem
		static allowed( next?: boolean ) {
			
			let perm = Notification.permission
			if( next === undefined ) return perm === 'granted'
			
			if( perm === 'granted' ) return true
			
			perm = $mol_wire_sync( this ).request_permissions()
			
			return perm === 'granted'
		}
		
		static async request_permissions() {
			return new Promise< NotificationPermission >( done =>
				Notification.requestPermission( perm => {
					done( perm )
				} )
			)
		}
		
		@ $mol_action
		static show( info: {
			context: string,
			message: string,
			uri: string
		} ) {
			navigator.serviceWorker.controller!.postMessage( info )
		}
		
	}
	
	if( typeof window === 'undefined' ) {
		
		self.addEventListener( 'message', async event => {
			
			let { context: title, message: body, uri: data } = event.data
			const tag = data
			
			const existen = await $mol_service().getNotifications({ tag })
			
			for( const not of existen ) {
				
				if( not.body.indexOf( body ) !== -1 ) body = not.body
				else if( body.indexOf( not.body ) === -1 ) body = not.body + '\n' + body
				
				not.close()
			}
			
			const vibrate = [ 100, 200, 300, 400, 500 ]
			
			await $mol_service().showNotification( title, { body, data, vibrate, tag } )
			
		} )
		
		self.addEventListener( 'notificationclick', $mol_service_handler( async ( event: any )=> {
			
			const clients: any[] = await ( self as any ).clients.matchAll({ includeUncontrolled: true })
			event.notification.close()

			if( clients.length ) {
				
				const last = clients[ clients.length - 1 ]
				await last.focus()
				await last.navigate( event.notification.data )
				
			} else {
				
				await ( self as any ).clients.openWindow( event.notification.data )
				
			}
			
		} ) )
		
	}
	
}
