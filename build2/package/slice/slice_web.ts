namespace $ {

	export class $mol_build2_package_slice_web extends $mol_build2_package_slice {

		filter( file: $mol_file2 ) {
			if( !super.filter( file ) ) return false
			if( /\.node\./.test( file.name() ) ) return false
			return true
		}

		prefix() {
			return 'web'
		}

		@ $mol_mem
		bundle_classes(): ( typeof $mol_build2_bundle )[] {
			return [
				...super.bundle_classes(),
				this.$.$mol_build2_bundle_css,
			]
		}

	}

	export class $mol_build2_package_slice_web_prod extends $mol_build2_package_slice_web {

		filter( file: $mol_file2 ) {
			if( !super.filter( file ) ) return false
			if( /\.(test|dev)\./.test( file.name() ) ) return false
			return true
		}
		
	}

	export class $mol_build2_package_slice_web_test extends $mol_build2_package_slice_web {

		prefix() {
			return 'web.test'
		}

		bundle_classes() {
			return this.root().bundle_test_classes()
		}
		
		filter( file: $mol_file2 ) {
			if( !super.filter( file ) ) return false
			return true
		}

	}

}
