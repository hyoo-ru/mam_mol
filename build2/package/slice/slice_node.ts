namespace $ {

	export class $mol_build2_package_slice_node extends $mol_build2_package_slice {

		filter( file: $mol_file2 ) {
			if( !super.filter( file ) ) return false
			if( /\.web\./.test( file.name() ) ) return false
			return true
		}

		prefix() {
			return 'node'
		}

	}

	export class $mol_build2_package_slice_node_prod extends $mol_build2_package_slice_node {

		filter( file: $mol_file2 ) {
			if( !super.filter( file ) ) return false
			if( /\.(test|dev)\./.test( file.name() ) ) return false
			return true
		}
		
	}

	export class $mol_build2_package_slice_node_test extends $mol_build2_package_slice_node {

		prefix() {
			return 'node.test'
		}

		filter( file: $mol_file2 ) {
			if( !super.filter( file ) ) return false
			// if( /\.test\./.test( file.name() ) ) return false
			return true
		}

		bundle_classes() {
			return this.root().bundle_test_classes()
		}

	}

}
