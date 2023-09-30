namespace $ {

	export class $mol_geo_position extends $mol_object {

		options() {
			return { enableHighAccuracy: true }
		}

		@ $mol_mem
		watcher() {
			const id = this.$.$mol_dom_context.navigator.geolocation.watchPosition(
				$mol_wire_async( (val: GeolocationPosition) => this.value(val) ),
				$mol_wire_async( (error: GeolocationPositionError) => this.error(error) ),
				this.options(),	
			)

			return { destructor: () => this.$.$mol_dom_context.navigator.geolocation.clearWatch(id) }
		}

		@ $mol_mem
		value(next?: GeolocationPosition) {
			this.watcher()
			return next ?? null
		}

		@ $mol_mem
		error(next?: GeolocationPositionError) {
			return next ?? null
		}

		accuracy() {
			return this.value()?.coords?.accuracy
		}

		altitude() {
			return this.value()?.coords?.altitude
		}

		altitudeAccuracy() {
			return this.value()?.coords?.altitudeAccuracy
		}

		heading() {
			return this.value()?.coords?.heading
		}

		latitude() {
			return this.value()?.coords?.latitude
		}

		longitude() {
			return this.value()?.coords?.longitude
		}

		speed() {
			return this.value()?.coords?.speed
		}

		timestamp() {
			return this.value()?.timestamp
		}
		
	}

}
