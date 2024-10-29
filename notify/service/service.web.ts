namespace $ {
	export class $mol_notify_service_web extends $mol_notify_service {
		override async info({ context: title, message: body, uri: data }: $mol_notify_info) {
			const worker = this.$.$mol_service_web.worker()
			const tag = data
			const existen = await worker.registration.getNotifications({ tag })
			
			for( const not of existen ) {
				
				if( not.body.indexOf( body ) !== -1 ) body = not.body
				else if( body.indexOf( not.body ) === -1 ) body = not.body + '\n' + body
				
				not.close()
			}
			
			// const vibrate = [ 100, 200, 300, 400, 500 ]
			
			await worker.registration.showNotification( title, { body, data, /*vibrate,*/ tag } )

		}

		override async notification_click( notification: Notification ) {
			const worker = this.$.$mol_service_web.worker()

			const clients = await worker.clients.matchAll({ includeUncontrolled: true, type: 'window' })
			const last = clients.at(-1)

			if( last ) {
				await last.focus()
				await last.navigate( notification.data )

				return
			}

			await worker.clients.openWindow( notification.data )
		}
	}

	$.$mol_notify_service = $mol_notify_service_web
}
