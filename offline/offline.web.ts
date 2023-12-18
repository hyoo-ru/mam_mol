namespace $ {
	
	const blacklist = new Set([
		'//cse.google.com/adsense/search/async-ads.js'
	])

	/** Installs service worker proxy, which caches all requests and respond from cache on http errors. */
	export function $mol_offline() {
		
		if( typeof window === 'undefined' ) {
			
			self.addEventListener( 'install' , ( event : any )=> {
				;( self as any ).skipWaiting()
			} )

			self.addEventListener( 'activate' , ( event : any )=> {
				
				caches.delete( 'v1' )
				caches.delete( '$mol_offline' )
				
				;( self as any ).clients.claim()
				
				$$.$mol_log3_done({
					place: '$mol_offline',
					message: 'Activated',
				})
				
			} )

			self.addEventListener( 'fetch' , ( event : any )=> {
				
				const request = event.request as Request
				
				if( blacklist.has( request.url.replace( /^https?:/, '' ) ) ) {
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
				
				if( request.method !== 'GET' || !/^https?:/.test( request.url ) ) {
					return event.respondWith( fetch( request ) )
				}
				
				const fresh = fetch( event.request ).then( response => {

					event.waitUntil(
						caches.open( '$mol_offline' ).then(
							cache => cache.put( event.request , response )
						)
					)
					
					return response.clone()
				} )
				event.waitUntil( fresh )
			
				event.respondWith(
					caches.match( event.request ).then( response => response || fresh )
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
			navigator.serviceWorker.register( 'web.js' )
		}

	}

}
