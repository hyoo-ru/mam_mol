namespace $ {
	
	const blacklist = new Set([
		'//cse.google.com/adsense/search/async-ads.js'
	])

	export function $mol_offline( uri = 'web.js' ) {
		
		if( typeof window === 'undefined' ) {
			
			self.addEventListener( 'install' , ( event : any )=> {
				self['skipWaiting']()
			} )

			self.addEventListener( 'activate' , ( event : any )=> {
				caches.delete( 'v1' )
				self['clients'].claim()
				console.info( '$mol_offline activated' )
			} )

			self.addEventListener( 'fetch' , ( event : any )=> {
				
				if( blacklist.has( event.request.url.replace( /^https?:/, '' ) ) ) {
					return event.respondWith(
						new Response(
							null,
							{
								status: 418,
								statusText: 'Blocked'
							},
						)
					)
				}
				
				const fresh = fetch( event.request )
				.then( async( response )=> {

					if( event.request.method !== 'GET' ) return response

					const cache = await caches.open( 'v1' )
					cache.put( event.request , response.clone() )
					
					return response
				} )
			
				event.respondWith(
					caches.match( event.request )
					.then( response => response || fresh )
				)
				
			})

			self.addEventListener( 'beforeinstallprompt' , ( event : any )=> {
				console.log( event )
				event.prompt()
			} )

		} else if( location.protocol !== 'https:' && location.hostname !== 'localhost' ) {
			console.warn( 'HTTPS or localhost is required for service workers.' )
		} else if( !navigator.serviceWorker ) {
			console.warn( 'Service Worker is not supported.' )
		} else {
			navigator.serviceWorker.register( uri )
		}

	}

}
