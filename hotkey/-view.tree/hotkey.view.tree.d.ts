declare namespace $ {

	export class $mol_hotkey extends $mol_plugin {
		event( ): ({ 
			keydown( next?: ReturnType< $mol_hotkey['keydown'] > ): ReturnType< $mol_hotkey['keydown'] >,
		})  & ReturnType< $mol_plugin['event'] >
		key( ): Record<string, any>
		mod_ctrl( ): boolean
		mod_alt( ): boolean
		mod_shift( ): boolean
		keydown( next?: any ): any
	}
	
}

//# sourceMappingURL=hotkey.view.tree.d.ts.map