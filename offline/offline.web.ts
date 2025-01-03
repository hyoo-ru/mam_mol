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
				
				// caches.delete( '$mol_offline' )
				
				;( self as any ).clients.claim()
				
				$$.$mol_log3_done({
					place: '$mol_offline',
					message: 'Activated',
				})
				
			} )

			self.addEventListener( 'fetch' , ( event : any )=> {
				
				const request = event.request as Request
				// console.log( 'FETCH', request.mode, request.cache, request.url )
				
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
				if( request.cache === 'no-store' ) return
				
				const fetch_data = () => fetch( new Request( request, { credentials: 'omit' } ) ).then( response => {
					if (response.status !== 200) return response
					
					event.waitUntil(
						caches.open( '$mol_offline' ).then(
							cache => cache.put( request , response )
						)
					)
					
					return response.clone()
				} )

				const enrich = ( response: Response )=> {

					// console.log( 'ENRICH', response.status, response.url )
					if( !response.status ) return response
					
					const headers = new Headers( response.headers )
					headers.set( "$mol_offline", "" )
					// headers.set( "Cross-Origin-Embedder-Policy", "credentialless" )
					// headers.set( "Cross-Origin-Resource-Policy", "cross-origin" )
					// headers.set( "Cross-Origin-Opener-Policy", "same-origin" )
					
					return new Response( response.body, {
						status: response.status,
						statusText: response.statusText,
						headers,
					});

				}

				const fresh = request.cache === 'force-cache' ? null : fetch_data()

				if (fresh) event.waitUntil( fresh.then( enrich ) )

				event.respondWith(
					caches.match( request ).then(
						cached => request.cache === 'no-cache' || request.cache === 'reload'
							? ( cached
								? fresh!
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
										cloned.headers.set( '$mol_offline_remote_status', message )
										return cloned
									})
								: fresh!
							)
							: ( cached || fresh || fetch_data() )
					).then( enrich )
				)
				
			})

			self.addEventListener( 'beforeinstallprompt' , ( event : any )=> event.prompt() )

		} else if( location.protocol !== 'https:' && location.hostname !== 'localhost' ) {
			console.warn( 'HTTPS or localhost is required for service workers.' )
		} else if( !navigator.serviceWorker ) {
			console.warn( 'Service Worker is not supported.' )
		} else {
			navigator.serviceWorker.register( 'web.js' ).then( reg => {
				// reg.addEventListener( 'updatefound', ()=> {
				// 	const worker = reg.installing!
				// 	worker.addEventListener( 'statechange', ()=> {
				// 		if( worker.state !== 'activated' ) return
				// 		window.location.reload()
				// 	} )
				// } )
			} )
		}

	}

	$.$mol_offline = $mol_offline_web

}
