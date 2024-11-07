declare namespace $ {

	type $mol_video_camera__torch__ELCC7AIG = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['torch'] >
		,
		ReturnType< $mol_video_camera['torch'] >
	>
	type $mol_video_camera__brightness__4FFHX7A6 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['brightness'] >
		,
		ReturnType< $mol_video_camera['brightness'] >
	>
	type $mol_video_camera__sharpness__FKRA3CQB = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['sharpness'] >
		,
		ReturnType< $mol_video_camera['sharpness'] >
	>
	type $mol_video_camera__contrast__KTGRHT3T = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['contrast'] >
		,
		ReturnType< $mol_video_camera['contrast'] >
	>
	type $mol_video_camera__saturation__PX57UU1M = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['saturation'] >
		,
		ReturnType< $mol_video_camera['saturation'] >
	>
	type $mol_video_camera__temperature__2M549C2R = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['temperature'] >
		,
		ReturnType< $mol_video_camera['temperature'] >
	>
	type $mol_row__sub__YD6EHPKD = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_check_icon__checked__S0UI34VE = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['torch'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__Icon__UCPXN0L1 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['Torch_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_labeler__title__F7W6634V = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__6ZVYHZ65 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__WKXZ9R3U = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['brightness'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__DPR4ODWN = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__M39VANO0 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__CRRHZ9V7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__GRM49B49 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['sharpness'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title__16KT2EIK = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__ZMD0D5YO = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__T5OXESLM = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['contrast'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__YIJJM6DY = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__J9EPPQJQ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__GAJTSEOA = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__VZOL2EDW = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['saturation'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__FPKCI2LB = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__SML7AOS6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__TAKZEKIE = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__AXJ2WGF1 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['temperature'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__042N9Z6L = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__YWRSSUDL = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__B1FFOAZ0 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__2PKZKHMW = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_scroll__sub__KYWR8A9W = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	export class $mol_video_camera_demo extends $mol_example_large {
		Player( ): $mol_video_camera
		View( ): $mol_row
		torch( next?: boolean ): boolean
		Torch_icon( ): $mol_icon_flashlight
		Torch( ): $mol_check_icon
		Torch_labeler( ): $mol_labeler
		brightness( next?: number ): number
		Brightness( ): $mol_number
		Brightness_labeler( ): $mol_labeler
		sharpness( next?: number ): number
		Sharpness( ): $mol_number
		Sharpness_labeler( ): $mol_labeler
		contrast( next?: number ): number
		Contrast( ): $mol_number
		Contrast_labeler( ): $mol_labeler
		saturation( next?: number ): number
		Saturation( ): $mol_number
		Saturation_labeler( ): $mol_labeler
		temperature( next?: number ): number
		Temperature( ): $mol_number
		Temperature_labeler( ): $mol_labeler
		Controls( ): $mol_row
		Scroll( ): $mol_scroll
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map