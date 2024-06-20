declare namespace $ {

	type $mol_check_icon__checked__CK8XIVYI = $mol_type_enforce<
		ReturnType< $mol_video_player_demo['playing'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__Icon__OG04MKCT = $mol_type_enforce<
		ReturnType< $mol_video_player_demo['Playing_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_paragraph__sub__PC5ZL8LO = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_labeler__title__PBOWZCU8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__JUSFQLML = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__T4PNXBLQ = $mol_type_enforce<
		ReturnType< $mol_video_player_demo['time'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_view__TELCHNET = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_view'] >
	>
	type $mol_labeler__title__79AVDZ3M = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__RGRKCNMA = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__J1X8N7OE = $mol_type_enforce<
		ReturnType< $mol_video_player_demo['volume'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision__4L47U2AC = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision'] >
	>
	type $mol_labeler__title__KHNNAO6D = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__RDQL67E1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__X550L8K7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_video_player_demo_playing__4P5TH3JO = $mol_type_enforce<
		Parameters< $mol_video_player_demo['playing'] >[0]
		,
		Parameters< ReturnType< $mol_video_player_demo['Player'] >['playing'] >[0]
	>
	type $mol_video_player_demo_volume__E04C7WKY = $mol_type_enforce<
		Parameters< $mol_video_player_demo['volume'] >[0]
		,
		Parameters< ReturnType< $mol_video_player_demo['Player'] >['volume'] >[0]
	>
	type $mol_video_player_demo_time__R4BF0FR7 = $mol_type_enforce<
		Parameters< $mol_video_player_demo['time'] >[0]
		,
		Parameters< ReturnType< $mol_video_player_demo['Player'] >['time'] >[0]
	>
	type $mol_video_player__uri__OTPNZBFO = $mol_type_enforce<
		ReturnType< $mol_video_player_demo['uri'] >
		,
		ReturnType< $mol_video_player['uri'] >
	>
	export class $mol_video_player_demo extends $mol_example_large {
		files( ): ReturnType< ReturnType< $mol_video_player_demo['Open'] >['files'] >
		Open( ): $mol_button_open
		Playing_icon( ): $mol_icon_play
		Playing( ): $mol_check_icon
		Duration( ): $mol_paragraph
		Duration_labeler( ): $mol_labeler
		Time( ): $mol_number
		Time_labeler( ): $mol_labeler
		Volume( ): $mol_number
		Volume_labeler( ): $mol_labeler
		Controls( ): $mol_row
		uri( ): string
		playing( next?: ReturnType< ReturnType< $mol_video_player_demo['Player'] >['playing'] > ): ReturnType< ReturnType< $mol_video_player_demo['Player'] >['playing'] >
		volume( next?: ReturnType< ReturnType< $mol_video_player_demo['Player'] >['volume'] > ): ReturnType< ReturnType< $mol_video_player_demo['Player'] >['volume'] >
		time( next?: ReturnType< ReturnType< $mol_video_player_demo['Player'] >['time'] > ): ReturnType< ReturnType< $mol_video_player_demo['Player'] >['time'] >
		duration( ): ReturnType< ReturnType< $mol_video_player_demo['Player'] >['duration'] >
		Player( ): $mol_video_player
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map