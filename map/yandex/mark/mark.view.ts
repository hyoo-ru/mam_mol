namespace $.$$ {

	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_map_yandex_demo
	 */
	export class $mol_map_yandex_mark extends $.$mol_map_yandex_mark {

		@ $mol_mem
		object() {
			const ymaps = $mol_map_yandex.api()

			return new ymaps.Placemark( this.pos() , {
				hintContent : this.hint() ,
				iconContent : this.title() ,
				balloonContent : this.content() ,
			} , {
				preset : "islands#redStretchyIcon" ,
			} )

		}

		@ $mol_mem
		found() {
			return $mol_geo_search({ query : this.address() })[0] ?? null
		}

		pos() {
			const coord = this.found()?.coord
			if ( coord ) return new $mol_vector_2d( coord[1] , coord[0] )
			return super.pos()
		}

		@ $mol_mem
		box() {
			return this.found()?.box ?? super.pos()
		}

	}

}
