namespace $ {
	
	const blacklist = new Set([
		'//cse.google.com/adsense/search/async-ads.js'
	])

	/** Installs service worker proxy, which caches all requests and respond from cache on http errors. */
	export function $mol_offline_web() {
		
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

				const fresh = fetch( request ).then( response => {
					if (response.status !== 200) return response
					const cached = response.clone()
					cached.headers.set(
						'x-origin-response',
						`${response.status}${response.statusText ? ` ${response.statusText}` : ''}`
					)

					event.waitUntil(
						caches.open( '$mol_offline' ).then(
							cache => cache.put( request , cached )
						)
					)
					
					return response
				} )

				event.waitUntil( fresh )
			
				event.respondWith(
					caches.match( request ).then(
						cached => request.cache === 'no-cache' || request.cache === 'reload'
							? ( cached
								? fresh
									.then(actual => {
										if (actual.status === cached.status) return actual
										throw new Error(
											`${actual.status}${actual.statusText ? ` ${actual.statusText}` : ''}`,
											{ cause: actual }
										)
									})
									.catch((err: Error) => {
										const cloned = cached.clone()
										const message = `${err.cause instanceof Response ? '' : '500 '}${err.message} $mol_offline fallback to cache`
										cloned.headers.set('x-origin-response', message)
										return cloned
									})
								: fresh
							)
							: ( cached || fresh )
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

	$.$mol_offline = $mol_offline_web

}
