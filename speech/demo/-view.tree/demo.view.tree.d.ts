declare namespace $ {

	type $mol_check_icon__Icon__6IJVM5LL = $mol_type_enforce<
		ReturnType< $mol_speech_demo['Toggle_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__checked__WJ44G738 = $mol_type_enforce<
		ReturnType< $mol_speech_demo['hearing'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_row__sub__1Y5NPD2V = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_button_major__click__J7JA43IQ = $mol_type_enforce<
		ReturnType< $mol_speech_demo['speak'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__sub__YARUZVU7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	export class $mol_speech_demo extends $mol_example_small {
		Toggle_icon( ): $mol_icon_microphone
		hearing( next?: boolean ): boolean
		Toggle( ): $mol_check_icon
		message( ): string
		Message( ): $mol_row
		speak( next?: any ): any
		Speak( ): $mol_button_major
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map