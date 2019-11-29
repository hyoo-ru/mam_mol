namespace $.$$ {

	export class $mol_map_yandex extends $.$mol_map_yandex {

		static api() {
			return $mol_import.script( `https://api-maps.yandex.ru/2.1/?lang=${ $mol_locale.lang() }` ).ymaps
		}

		@ $mol_mem
		api( next? : any , force? : $mol_mem_force ) : any {
			
			const ymaps = $mol_map_yandex.api()

			const load_map = $mol_fiber_sync( ()=> new Promise( done => ymaps.ready( done ) ) )
			load_map()

			const api = new ymaps.Map( this.dom_node() , {
				center : [ 0 , 0 ] ,
				zoom : 0 ,
			} )

			api.controls.remove( 'fullscreenControl' )
			api.controls.remove( 'typeSelector' )

			api.events.add( [ 'actionend' ] , ( event : any )=> {
				new $mol_after_frame( $mol_fiber_root( ()=> {
					this.update( event ) 
				} ) )
			} )

			return api
		}

		update( event? : any ) {
			this.zoom( this.api().getZoom() )
			this.center( this.api().getCenter() )
		}

		render() {
			const api = this.api()
			
			api.setCenter( this.center() , this.zoom() )
			
			api.geoObjects.removeAll()
			for( let obj of this.objects() ) {
				api.geoObjects.add( obj.object() )
			}
			
			this.dom_node_actual()

		}

	}

}
