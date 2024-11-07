declare namespace $ {

	type $mol_audio_demo_vibe_room_status__8INJ9MQP = $mol_type_enforce<
		Parameters< $mol_audio_demo_vibe['room_status'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_vibe['Room'] >['status'] >[0]
	>
	type $mol_audio_demo_vibe_active__IYLRZ34Z = $mol_type_enforce<
		Parameters< $mol_audio_demo_vibe['active'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_vibe['Beep_vibe'] >['active'] >[0]
	>
	type $mol_audio_demo_vibe_stop_at__4ES0MB3F = $mol_type_enforce<
		Parameters< $mol_audio_demo_vibe['stop_at'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_vibe['Beep_vibe'] >['stop_at'] >[0]
	>
	type $mol_audio_vibe__freq_default__K7T4VKJO = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['freq'] >
		,
		ReturnType< $mol_audio_vibe['freq_default'] >
	>
	type $mol_audio_vibe__shape_default__4FMB15WH = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape'] >
		,
		ReturnType< $mol_audio_vibe['shape_default'] >
	>
	type $mol_number__precision_change__SV3R5SJW = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_number__value__UV3T54Q2 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['duration'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title__LBJY9961 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['duration_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__NVQI2VH7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__precision_change__IOYWUEX9 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_number__value__M6PUG38T = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['freq'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title__OZJIF1D7 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['frequency_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__HMO6ZC5P = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_select__Filter__OGCA3FPT = $mol_type_enforce<
		any
		,
		ReturnType< $mol_select['Filter'] >
	>
	type $mol_select__value__WNUM0NRD = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_audio_demo_vibe_Shape_select__MFJGORNQ = $mol_type_enforce<
		`sine`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__X07H1NJO = $mol_type_enforce<
		`square`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__35CYZ9K8 = $mol_type_enforce<
		`sawtooth`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__2J621SJF = $mol_type_enforce<
		`triangle`
		,
		$mol_audio_vibe_shape
	>
	type $mol_select__options__3LWYIVRE = $mol_type_enforce<
		readonly($mol_audio_vibe_shape)[]
		,
		ReturnType< $mol_select['options'] >
	>
	type $mol_labeler__title__H4LU788T = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__IHPAUQYM = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_button_major__click__95SASYCN = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['beep_vibe_start_click'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__sub__WVK5H65X = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_audio_status__status__VOKJ9F5L = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['room_status'] >
		,
		ReturnType< $mol_audio_status['status'] >
	>
	type $mol_row__sub__O6UR2WTJ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_list__rows__1VWSIMJ9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_audio_room__input__GJROM9SV = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_audio_room['input'] >
	>
	export class $mol_audio_demo_vibe extends $mol_example_small {
		room_status( next?: ReturnType< ReturnType< $mol_audio_demo_vibe['Room'] >['status'] > ): ReturnType< ReturnType< $mol_audio_demo_vibe['Room'] >['status'] >
		active( next?: ReturnType< ReturnType< $mol_audio_demo_vibe['Beep_vibe'] >['active'] > ): ReturnType< ReturnType< $mol_audio_demo_vibe['Beep_vibe'] >['active'] >
		stop_at( next?: ReturnType< ReturnType< $mol_audio_demo_vibe['Beep_vibe'] >['stop_at'] > ): ReturnType< ReturnType< $mol_audio_demo_vibe['Beep_vibe'] >['stop_at'] >
		freq( next?: number ): number
		Beep_vibe( ): $mol_audio_vibe
		duration_label( ): string
		duration( next?: number ): number
		Duration_num( ): $mol_number
		Duration( ): $mol_labeler
		frequency_label( ): string
		Frequency_num( ): $mol_number
		Frequency( ): $mol_labeler
		shape_label( ): string
		shape( next?: any ): any
		Shape_select( ): $mol_select
		Shape( ): $mol_labeler
		beep_vibe_start_click( next?: any ): any
		Play_icon( ): $mol_icon_play
		Play_button( ): $mol_button_major
		Room_status( ): $mol_audio_status
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