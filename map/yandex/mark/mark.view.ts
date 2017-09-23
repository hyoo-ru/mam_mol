namespace $.$$ {

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

	}

}
