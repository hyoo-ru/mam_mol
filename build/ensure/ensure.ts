namespace $ {
	export interface $mol_build_ensure_plugin {
		ensure(path: string): boolean
	}

	export class $mol_build_ensure extends $mol_object {
		root() { return $mol_file.absolute('') }

		interactive() { return process.stdout.isTTY }
		pull_timeout() { return 120000 }

		@ $mol_mem_key
		meta( path : string ) {

			let decls = [] as $mol_tree2[]

			const pack = this.$.$mol_file.absolute( path )

			for( const file of pack.sub() ) {
				if( !/\.meta\.tree$/.test( file.name() ) ) continue
				decls = decls.concat( this.$.$mol_tree2_from_string( file.text() , file.path() ).kids )
			}

			return decls.length ? this.$.$mol_tree2.list(decls, decls[0]?.span) : null
		}

		@ $mol_mem
		ensurer_git(): $mol_build_ensure_plugin {
			return this.$.$mol_build_ensure_git.make({
				root: () => this.root(),
				meta: path => this.meta(path),
				pull_timeout: () => this.pull_timeout(),
				interactive: () => this.interactive(),
			})
		}

		@ $mol_mem
		ensurer_fallback(): $mol_build_ensure_plugin {
			return this.$.$mol_build_ensure_npm.make({
				root: () => this.root(),
			})
		}

		@ $mol_mem
		ensurers() {
			return [
				this.ensurer_git()
			] as readonly ($mol_build_ensure_plugin | null)[]
		}

		@ $mol_mem_key
		ensure( path : string ): boolean {
			const mod = $mol_file.absolute( path )
			const parent = mod.parent()

			if( mod !== this.root() ) this.ensure( parent.path() )

			for (const ensurer of this.ensurers()) {
				if (ensurer?.ensure(path)) return true
			}

			if( parent === this.root() ) {
				throw new Error( `Root package "${ mod.relate( this.root() ) }" not found` )
			}

			return this.ensurer_fallback().ensure(path)
		}
	}
}
