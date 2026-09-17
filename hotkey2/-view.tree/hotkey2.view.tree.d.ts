declare namespace $ {

	export class $mol_hotkey2 extends $mol_plugin {
		keydown( next?: any ): any
		event( ): ({ 
			keydown( next?: ReturnType< $mol_hotkey2['keydown'] > ): ReturnType< $mol_hotkey2['keydown'] >,
		})  & ReturnType< $mol_plugin['event'] >
		action( ): Record<string, any>
	}
	
}

//# sourceMappingURL=hotkey2.view.tree.d.ts.map