namespace $ {
	
	const blacklist = new Set([
		'//cse.google.com/adsense/search/async-ads.js'
	])

	// function is_fresh(res: Response) {
	// 	res.headers.get('ca')
	// }

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
				
				if( request.method !== 'GET' ) return
				if( !/^https?:/.test( request.url ) ) return
				if( /\?/.test( request.url ) ) return
				if (request.cache === 'no-store') return

				const fresh = fetch( event.request ).then( response => {
					if (response.status >= 500) return response

					event.waitUntil(
						caches.open( '$mol_offline' ).then(
							cache => cache.put( event.request , response )
						)
					)
					
					return response.clone()
				} )

				event.waitUntil( fresh )
			
				event.respondWith(
					caches.match( event.request ).then(
						response => request.cache === 'no-cache'
							? ( response
								? fresh.catch(err => {
									console.error(err)
									return response
								})
								: fresh
							)
							: ( response || fresh )
					)
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
