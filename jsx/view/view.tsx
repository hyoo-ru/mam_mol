/** @jsx $mol_jsx */
namespace $ {

	export class $mol_jsx_view extends $mol_object2 {

		static of< This extends typeof $mol_jsx_view >( this : This , node : Element ) {
			return node[ this as any ] as InstanceType< This >
		}
		
		attributes! : Partial< Pick< this , Exclude< keyof this , 'valueOf' > > >
		ownerDocument! : typeof $mol_jsx_document
		
		get childNodes() {
			return this._kids()
		}
		set childNodes( next: Array< Node | string > ) {
			this._kids( next )
		}
		
		@ $mol_mem
		_kids( next = [] as Array< Node | string > ) { return next }
		
		@ $mol_mem
		valueOf() {
			
			const prefix = $mol_jsx_prefix
			const booked = $mol_jsx_booked
			const document = $mol_jsx_document
			
			try {
				
				$mol_jsx_prefix = this[ Symbol.toStringTag ]
				$mol_jsx_booked = new Set
				$mol_jsx_document = this.ownerDocument

				return this.render()

			} finally {

				$mol_jsx_prefix = prefix
				$mol_jsx_booked = booked
				$mol_jsx_document = document

			}

		}
		
		render() : HTMLElement {
			return $mol_fail( new Error( `render() isn't implemented` ) )
		}

	}

}
