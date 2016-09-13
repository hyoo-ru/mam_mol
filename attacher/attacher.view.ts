module $.$mol {

	export class $mol_attacher extends $.$mol_attacher {

		attachNew( ...diff : string[] ) {
			var items = this.items()
			var itemer = this.itemer( items.length )
			itemer.urlThumb( diff[0] )
			itemer.urlLoad( diff[0] )
			this.items( items.concat( itemer ) )
		}
		
		@ $mol_prop()
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

		fileNew( ...diff : string[] ) {
			return diff[0]
		}
		
		eventCapture( ...diff : Event[] ) {
			if( !$mol_cordova_camera() ) return
			
			diff[0].preventDefault()
			
			$mol_cordova_camera().getPicture( ( url : string )=> {
				this.fileNew( url )
			}, ( error : Error )=> {
				this.fileNew( <any> error )
			}, {
				quality: 50
			} )
		}

		eventPicked( ...diff : Event[] ) {
			var files = [].slice.call( ( diff[0].target as HTMLInputElement ).files )
			for( var file of files ) {
				this.fileNew( URL.createObjectURL( file ) )
			}
		}

	}

}
