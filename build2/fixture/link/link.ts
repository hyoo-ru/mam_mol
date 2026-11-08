namespace $ {
	export function $mol_build2_fixture_link() {
		const esm: typeof import( './esm/esm' ) = require( './esm/esm' )
		return esm.twice( 2 )
	}
}
