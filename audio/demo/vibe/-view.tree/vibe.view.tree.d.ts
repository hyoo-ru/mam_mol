declare namespace $ {

	type $mol_audio_vibe__freq__F335IL65 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['frequency'] >
		,
		ReturnType< $mol_audio_vibe['freq'] >
	>
	type $mol_audio_vibe__shape__38EX09LZ = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape'] >
		,
		ReturnType< $mol_audio_vibe['shape'] >
	>
	type $mol_number__precision_change__T7VGW6B7 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_number__value__M2BVCK7J = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['duration'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title__7KPAWBRM = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['duration_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__SIJ16MSF = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__precision_change__O75ZVGFW = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_number__value__52C7KZ0L = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['frequency'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title__MLLR3LUB = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['frequency_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__NMUY5S6O = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_select__Filter__GG76QCX2 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_select['Filter'] >
	>
	type $mol_select__value__7BQW3WKD = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_audio_demo_vibe_Shape_select__I26T5EWK = $mol_type_enforce<
		`sine`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__6PROQ070 = $mol_type_enforce<
		`square`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__MDX52P6F = $mol_type_enforce<
		`sawtooth`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__CHUMJH38 = $mol_type_enforce<
		`triangle`
		,
		$mol_audio_vibe_shape
	>
	type $mol_select__options__6831QGMP = $mol_type_enforce<
		readonly($mol_audio_vibe_shape)[]
		,
		ReturnType< $mol_select['options'] >
	>
	type $mol_labeler__title__BGD06TYK = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__Q80289UZ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_button_major__click__TPSZT4FO = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['play'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__sub__9K7R6L2E = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_row__sub__FOGBH6JN = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_list__rows__STPF7X3D = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_audio_room__duration__QHFCVIRO = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['duration'] >
		,
		ReturnType< $mol_audio_room['duration'] >
	>
	type $mol_audio_room__input__8RHY193M = $mol_type_enforce<
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