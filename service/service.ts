namespace $ {
	
	function worker() {
		return navigator.serviceWorker.ready
	}
	
	export function $mol_service() {
		if( typeof window === 'undefined' ) {
			return ( self as any ).registration as ServiceWorkerRegistration
		} else {
			return $mol_wire_sync( worker )()
		}
	}
	
	export function $mol_service_handler< E extends Event >( handle : ( event: E )=> Promise<any> ) {
		return ( event: E )=> {
			;( event as any ).waitUntil( handle( event ) )
		}
	}
	
}
