declare namespace $ {

	type $mol_video_camera__torch__7KRA3Q64 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['torch'] >
		,
		ReturnType< $mol_video_camera['torch'] >
	>
	type $mol_video_camera__brightness__A05UDGYL = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['brightness'] >
		,
		ReturnType< $mol_video_camera['brightness'] >
	>
	type $mol_video_camera__sharpness__AXS7NJNA = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['sharpness'] >
		,
		ReturnType< $mol_video_camera['sharpness'] >
	>
	type $mol_video_camera__contrast__9ZA9FPUG = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['contrast'] >
		,
		ReturnType< $mol_video_camera['contrast'] >
	>
	type $mol_video_camera__saturation__OD7KRUGO = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['saturation'] >
		,
		ReturnType< $mol_video_camera['saturation'] >
	>
	type $mol_video_camera__temperature__PTXF6ABI = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['temperature'] >
		,
		ReturnType< $mol_video_camera['temperature'] >
	>
	type $mol_row__sub__8O0I3Z3V = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_check_icon__checked__59F10I39 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['torch'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__Icon__1KKSBDZG = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['Torch_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_labeler__title__Y2A225A0 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__T0MV7S44 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__5UKBLSFR = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['brightness'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__ILH52J6F = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__UZ3J9CKL = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__K3JIZN8Y = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__I9CQFRE9 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['sharpness'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title__3U9BB99W = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__V85RVCIA = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__01CNQ9MV = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['contrast'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__FHCTFVFB = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__67PAFZOA = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__Y5NVRSKB = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__HLL1GFLA = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['saturation'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__RRE53KKD = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__PG1N0PKG = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__KX2OKI6I = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__C49H6V4J = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['temperature'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__MUSU6QDA = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__0UJZUPWD = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__29E94BAU = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__IFPLA4R6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_scroll__sub__V0AYZVJ4 = $mol_type_enforce<
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