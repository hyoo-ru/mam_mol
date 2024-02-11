declare namespace $ {

	export class $mol_link_lazy extends $mol_link {
		uri( next?: string ): string
		uri_generated( ): string
		current( ): boolean
		event( ): ({ 
			mousedown( next?: ReturnType< $mol_link_lazy['generate'] > ): ReturnType< $mol_link_lazy['generate'] >,
		})  & ReturnType< $mol_link['event'] >
		generate( next?: any ): any
	}
	
}

//# sourceMappingURL=lazy.view.tree.d.ts.map