namespace $.$$ {

	/**
	 * Prints large bulk of text.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_filler_demo
	 */
	export class $mol_filler extends $.$mol_filler {

		override filler_lines() {
			const lines = []

			let len_cur = 0

			while ( len_cur < this.min_symbols() ) {
				const line = this.$.$mol_array_lottery( super.filler_lines() )

				len_cur += line.length

				lines.push( line )
			}

			return lines
		}

	}

}
