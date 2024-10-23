declare namespace $ {

	type $mol_button_minor__click__EI2UVKG7 = $mol_type_enforce<
		ReturnType< $mol_audio_status['wakeup'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__enabled__MLUDBFZH = $mol_type_enforce<
		ReturnType< $mol_audio_status['wakeup_enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__hint__DF6DSJZ5 = $mol_type_enforce<
		ReturnType< $mol_audio_status['status_name'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__sub__6LYDSE7Y = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $mol_audio_status extends $mol_view {
		Closed( ): $mol_icon_power_sleep
		Suspended( ): $mol_icon_sleep
		Playing( ): $mol_icon_play
		Running( ): $mol_icon_pause
		wakeup( next?: any ): any
		wakeup_enabled( ): boolean
		status_name( ): ReturnType< $mol_audio_status['status'] >
		Icon( ): $mol_icon_play
		Wakeup( ): $mol_button_minor
		icons( ): ({ 
			'closed': ReturnType< $mol_audio_status['Closed'] >,
			'suspended': ReturnType< $mol_audio_status['Suspended'] >,
			'playing': ReturnType< $mol_audio_status['Playing'] >,
			'running': ReturnType< $mol_audio_status['Running'] >,
		}) 
		status( next?: string ): string
		status_template( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=status.view.tree.d.ts.map