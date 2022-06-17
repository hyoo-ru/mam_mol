/** @jsx $mol_jsx */
namespace $ {

	/** Reactive JSX component */
	export abstract class $mol_jsx_view extends $mol_object2 {

		/** Returns component instance for DOM node. */
		static of< This extends typeof $mol_jsx_view >( this : This , node : Element ) {
			return node[ this as any ] as InstanceType< This >
		}
		
		attributes! : Partial< Pick< this , Exclude< keyof this , 'valueOf' > > >
		ownerDocument! : typeof $mol_jsx_document
		className! : typeof $mol_jsx_crumbs
		
		@ $mol_wire_field
		get childNodes() {
			return [] as Array< Node | string >
		}
		
		@ $mol_mem
		valueOf() {
			
			const prefix = $mol_jsx_prefix
			const booked = $mol_jsx_booked
			const crumbs = $mol_jsx_crumbs
			const document = $mol_jsx_document
			
			try {
				
				$mol_jsx_prefix = this[ Symbol.toStringTag ]
				$mol_jsx_booked = new Set
				$mol_jsx_crumbs = this.className
				$mol_jsx_document = this.ownerDocument

				return this.render()

			} finally {

				$mol_jsx_prefix = prefix
				$mol_jsx_booked = booked
				$mol_jsx_crumbs = crumbs
				$mol_jsx_document = document

			}

		}
		
		abstract render() : HTMLElement

	}

}
