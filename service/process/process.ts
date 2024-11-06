namespace $ {
	export function $mol_service_process() {
		return typeof self !== 'undefined' && Boolean((self as unknown as { serviceWorker?: {} }).serviceWorker)
	}
}
