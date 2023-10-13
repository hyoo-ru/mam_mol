namespace $.$$ {

	/**
	 * Simple [Yandex Maps](https://tech.yandex.ru/maps/doc/jsapi/2.1/) wrapper.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_map_yandex_demo
	 */
	export class $mol_map_yandex extends $.$mol_map_yandex {

		static api_key() {
			return "3b2caac0-490e-4fdc-92de-d2a09e400365"
		}

		static api() {
			return $mol_import.script( `https://api-maps.yandex.ru/2.1/?apikey=${this.api_key()}&lang=${ $mol_locale.lang() }` ).ymaps
		}
		
		wait_ready( ymaps: any ) {
			return new Promise( done => ymaps.ready( done ) )
		}

		@ $mol_mem
		api( next? : any , force? : $mol_mem_force ) : any {
			
			const ymaps = $mol_map_yandex.api()
			$mol_wire_sync( this ).wait_ready( ymaps )

			const api = new ymaps.Map( this.dom_node() , {
				center : [ 0 , 0 ] ,
				zoom : 0 ,
			} )

			api.copyrights.add( $mol_geo_search_attribution );

			api.controls.remove( 'fullscreenControl' )
			api.controls.remove( 'typeSelector' )

			api.events.add( [ 'actionend' ] , ( event : any )=> {
				new $mol_after_tick( $mol_fiber_root( ()=> {
					this.update( event ) 
				} ) )
			} )

			return api
		}

		update( event? : any ) {
			this.zoom( this.api().getZoom() )
			this.center( this.api().getCenter() )
		}

		@ $mol_mem
		bounds_updated() {
			const box = this.objects()[0]?.box()
			if( box ) {
				this.api().setBounds([
					[box.x.min,box.y.min],
					[box.x.max,box.y.max],
				])
			}
			return true
		}

		@ $mol_mem
		center( next? : readonly[number,number] , force? : $mol_mem_force ) {

			if ( next !== undefined ) return next
			
			const pos = this.objects()[0]?.pos()
			if( pos ) return pos
			
			return [0,0] as readonly[number,number]
		}
		
		render() {
			const api = this.api()
			
			api.setCenter( this.center() , this.zoom() )

			// this.bounds_updated()
			
			api.geoObjects.removeAll()
			for( let obj of this.objects() ) {
				api.geoObjects.add( obj.object() )
			}
			
			this.dom_node_actual()

		}

	}

}
