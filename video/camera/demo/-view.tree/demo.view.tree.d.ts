declare namespace $ {

	type $mol_video_camera__torch__VU6AG0E0 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['torch'] >
		,
		ReturnType< $mol_video_camera['torch'] >
	>
	type $mol_video_camera__brightness__XBUUZ3XL = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['brightness'] >
		,
		ReturnType< $mol_video_camera['brightness'] >
	>
	type $mol_video_camera__sharpness__Z2I68BTB = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['sharpness'] >
		,
		ReturnType< $mol_video_camera['sharpness'] >
	>
	type $mol_video_camera__contrast__4CYG8JLX = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['contrast'] >
		,
		ReturnType< $mol_video_camera['contrast'] >
	>
	type $mol_video_camera__saturation__8OP5G9X4 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['saturation'] >
		,
		ReturnType< $mol_video_camera['saturation'] >
	>
	type $mol_video_camera__temperature__6FT0UKXD = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['temperature'] >
		,
		ReturnType< $mol_video_camera['temperature'] >
	>
	type $mol_row__sub__RKSFCREJ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_check_icon__checked__DRRXE95L = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['torch'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__Icon__KIMOIM95 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['Torch_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_labeler__title__YIBNJL5K = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__CEVWH1VX = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__D7PT5NN8 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['brightness'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__0FRMGAQN = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__RMOR30O8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__LN64T4WL = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__ZRTIKJZ7 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['sharpness'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title__Z6RCZD1K = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__4DF5J07T = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__WPK0VM17 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['contrast'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__W0GXTBRZ = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__2390EEJG = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__5LACSAYY = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__VN5SP7O4 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['saturation'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__TNWRT6MT = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__YXF7KHPY = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__CSO0GHFS = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__XQPOUB2C = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['temperature'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__3Z0MDUJN = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__SDRDDQOR = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__DPX0425Y = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__UBSSM4S1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_scroll__sub__U73JPUTJ = $mol_type_enforce<
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