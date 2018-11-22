namespace $ {

	export function $mol_atom2_poll< Value >( calculate : ()=> Value ) {

		const $$ : typeof $ = this || $
		
		return $$.$mol_atom2.make( atom => {
			atom[ Symbol.toStringTag ] = calculate[ Symbol.toStringTag ] || calculate.name || '$mol_atom2_digest'
			const update = ()=> {
				atom.cursor = $mol_fiber_status.obsolete
				atom.update()
			}
			let timer : $mol_after_frame
			atom.calculate = ()=> {
				timer = new $$.$mol_after_frame( update )
				return calculate()
			}
			atom.abort = ()=> {
				atom.forget()
				timer.destructor()
			}
			return atom
		} )

	}

}
