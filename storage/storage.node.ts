namespace $ {
	export class $mol_storage_node extends $mol_storage {
		
		static override persisted() {
			return true
		}
		
		static stats() {
			return $node.fs.statfsSync( '.' )
		}
		
		static override total() {
			const { blocks, bsize } = this.stats()
			return blocks * bsize
		}
		
		static override used() {
			const { blocks, bfree, bsize } = this.stats()
			return ( blocks - bfree ) * bsize
		}
		
		static override free() {
			const { bfree, bsize } = this.stats()
			return bfree * bsize
		}
		
		static override portion() {
			
			const { blocks, bfree } = this.stats()
			if( !blocks ) return 1
			
			return ( blocks - bfree ) / blocks
		}
		
	}
	$.$mol_storage = $.$mol_storage_node
}
