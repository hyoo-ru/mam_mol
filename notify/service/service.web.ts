namespace $ {
	export class $mol_notify_service_web extends $mol_notify_service {
		static override init() {
			const scope = this.$.$mol_service_host_web.scope()
			scope.addEventListener( 'notificationclick', this.notification_click_event.bind(this))
		}

		protected static notification_click_event(event: NotificationEvent) {
			event.waitUntil(this.notification_click(event.notification))
		}

		static override async info({ context: title, message: body, uri: data }: $mol_notify_info) {
			const scope = this.$.$mol_service_host_web.scope()
			const tag = data
			const existen = await scope.registration.getNotifications({ tag })
			
			for( const not of existen ) {
				
				if( not.body.indexOf( body ) !== -1 ) body = not.body
				else if( body.indexOf( not.body ) === -1 ) body = not.body + '\n' + body
				
				not.close()
			}
			
			// const vibrate = [ 100, 200, 300, 400, 500 ]
			
			await scope.registration.showNotification( title, { body, data, /*vibrate,*/ tag } )

		}

		static async notification_click( notification: Notification ) {
			const scope = this.$.$mol_service_host_web.scope()

			const clients = await scope.clients.matchAll({ includeUncontrolled: true, type: 'window' })
			const last = clients.at(-1)

			if( last ) {
				await last.focus()
				await last.navigate( notification.data )

				return
			}

			await scope.clients.openWindow( notification.data )
		}
	}

	$.$mol_notify_service = $mol_notify_service_web

	export namespace $mol_service {
		export const $mol_notify_service = $mol_notify_service_web
	}
}
