declare namespace $ {

	type $mol_audio_vibe__freq__65IAFWE3 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['frequency'] >
		,
		ReturnType< $mol_audio_vibe['freq'] >
	>
	type $mol_audio_vibe__shape__JIKVACL1 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape'] >
		,
		ReturnType< $mol_audio_vibe['shape'] >
	>
	type $mol_number__precision_change__1IM35X2K = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_number__value__ZEMZ9S6J = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['duration'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title__OGNJQZPZ = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['duration_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__Q3HJGN90 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__precision_change__4051P7F7 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_number__value__IO4DVVK4 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['frequency'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title__ZZ375D0X = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['frequency_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__NZZIVLQ7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_select__Filter__1T0J3QQC = $mol_type_enforce<
		any
		,
		ReturnType< $mol_select['Filter'] >
	>
	type $mol_select__value__B94BD8NL = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_audio_demo_vibe_Shape_select__3RDAXFDA = $mol_type_enforce<
		`sine`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__OOYCSE95 = $mol_type_enforce<
		`square`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__B3JDEV6J = $mol_type_enforce<
		`sawtooth`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__GNCK7BJW = $mol_type_enforce<
		`triangle`
		,
		$mol_audio_vibe_shape
	>
	type $mol_select__options__PMJO0UME = $mol_type_enforce<
		readonly($mol_audio_vibe_shape)[]
		,
		ReturnType< $mol_select['options'] >
	>
	type $mol_labeler__title__61VI2359 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__6VST5HK5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_button_major__click__M0TPEFFW = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['play'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__sub__ZN63WPZ9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_row__sub__20R314Q2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_list__rows__10Q02HCF = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_audio_room__duration__CNYNK3OS = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['duration'] >
		,
		ReturnType< $mol_audio_room['duration'] >
	>
	type $mol_audio_room__input__2TS2FJ6O = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_audio_room['input'] >
	>
	export class $mol_audio_demo_vibe extends $mol_example_small {
		play( ): ReturnType< ReturnType< $mol_audio_demo_vibe['Room'] >['play'] >
		Beep_vibe( ): $mol_audio_vibe
		duration_label( ): string
		duration( next?: number ): number
		Duration_num( ): $mol_number
		Duration( ): $mol_labeler
		frequency_label( ): string
		frequency( next?: number ): number
		Frequency_num( ): $mol_number
		Frequency( ): $mol_labeler
		shape_label( ): string
		shape( next?: any ): any
		Shape_select( ): $mol_select
		Shape( ): $mol_labeler
		Play_icon( ): $mol_icon_play
		Play_button( ): $mol_button_major
		Button_row( ): $mol_row
		List( ): $mol_list
		title( ): string
		Room( ): $mol_audio_room
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=vibe.view.tree.d.ts.map