module $.$mol {

	export class $mol_attacher extends $.$mol_attacher {

		attachNew( next? : string ) {
			var items = this.items()
			var itemer = this.itemer( items.length )
			itemer.urlThumb( next )
			itemer.urlLoad( next )
			this.items( items.concat( itemer ) )
		}
		
		@ $mol_mem_key()
		itemer( id : number ) {
			return new $mol_attacher_item()
		}

	}

	export class $mol_attacher_item extends $.$mol_attacher_item {

		styleBG() {
			return `url("${this.urlThumb()}")`
		}

	}

	export class $mol_attacher_adder extends $.$mol_attacher_adder {

		fileNew( next? : string ) {
			return next
		}
		
		eventCapture( next? : Event ) {
			if( !$mol_cordova_camera() ) return
			
			next.preventDefault()
			
			$mol_cordova_camera().getPicture( ( url : string )=> {
				this.fileNew( url )
			}, ( error : Error )=> {
				this.fileNew( <any> error )
			}, {
				quality: 50
			} )
		}

		eventPicked( next? : Event ) {
			var files = [].slice.call( ( next.target as HTMLInputElement ).files )
			for( var file of files ) {
				this.fileNew( URL.createObjectURL( file ) )
			}
		}

	}

}
