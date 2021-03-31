namespace $ {
	
	export function $mol_service() {
		return ( typeof window === 'undefined' )
			? self['registration'] as ServiceWorkerRegistration
			: $mol_fiber_sync( ()=> navigator.serviceWorker.ready )()
	}
	
	export function $mol_service_handler< E extends Event >( handle : ( event: E )=> Promise<any> ) {
		return ( event: E )=> {
			event['waitUntil']( handle( event ) )
		}
	}
	
}
