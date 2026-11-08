namespace $ {

	/** Source file transpiler. */
	export class $mol_build2_convert extends $mol_object2 {

		static match( _file: $mol_file2 ): boolean {
			return false
		}

		root(): $mol_build2_root {
			return $mol_fail( new Error( 'root is not set' ) )
		}

		source(): $mol_file2 {
			return $mol_fail( new Error( 'source is not set' ) )
		}

		@ $mol_mem
		generated_artifacts(): $mol_file2[] {
			return []
		}

		/** Will be included in further processing (converting, deps searching) */
		@ $mol_mem
		generated_sources(): $mol_file2[] {
			return []
		}

		artifacts_for( _slice: $mol_build2_package_slice ): $mol_file2[] {
			return this.generated_artifacts()
		}

	}

}
