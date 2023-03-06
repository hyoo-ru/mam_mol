namespace $.$$ {
	
	export class $mol_filler extends $.$mol_filler {

		override filler_lines() {
			const lines = []

			const filler_lines_len = super.filler_lines().length

			let len_cur = 0

			while ( len_cur < this.min_simbols() ) {
				const line = this.$.$mol_array_lottery( super.filler_lines() )

				len_cur += line.length

				lines.push( line )
			}

			return lines
		}

	}

}
