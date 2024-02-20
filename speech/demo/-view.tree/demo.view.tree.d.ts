declare namespace $ {

	type $mol_check_icon__Icon__E77EYL7Q = $mol_type_enforce<
		ReturnType< $mol_speech_demo['Toggle_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__checked__RXIZRLOL = $mol_type_enforce<
		ReturnType< $mol_speech_demo['hearing'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_row__sub__ULKFOTO9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_button_major__click__KI438E5Z = $mol_type_enforce<
		ReturnType< $mol_speech_demo['speak'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__sub__7XVKK8HF = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	export class $mol_speech_demo extends $mol_example_small {
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
		Toggle_icon( ): $mol_icon_microphone
		hearing( next?: boolean ): boolean
		Toggle( ): $mol_check_icon
		message( ): string
		Message( ): $mol_row
		speak( next?: any ): any
		Speak( ): $mol_button_major
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map