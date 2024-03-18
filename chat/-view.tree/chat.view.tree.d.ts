declare namespace $ {

	type $mol_link__uri__AC6CBHG5 = $mol_type_enforce<
		ReturnType< $mol_chat['standalone'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__sub__7EYLUY20 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg__P5XJSE97 = $mol_type_enforce<
		({ 
			'mol_chat': any,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub__SZW2CABL = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_frame__uri__HE4A7ZCP = $mol_type_enforce<
		ReturnType< $mol_chat['embed'] >
		,
		ReturnType< $mol_frame['uri'] >
	>
	type $mol_page__title__IPB7U53J = $mol_type_enforce<
		ReturnType< $mol_chat['title'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools__FV258V4P = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__Body__NIAJIJOP = $mol_type_enforce<
		ReturnType< $mol_chat['Embed'] >
		,
		ReturnType< $mol_page['Body'] >
	>
	export class $mol_chat extends $mol_link {
		Icon( ): $mol_icon_forum_outline
		title( ): string
		standalone( ): string
		Standalone_icon( ): $mol_icon_open_in_new
		Esternal( ): $mol_link
		Close_icon( ): $mol_icon_cross
		Close( ): $mol_link
		embed( ): string
		Embed( ): $mol_frame
		Page( ): $mol_page
		seed( ): string
		opened( ): boolean
		arg( ): ({ 
			'mol_chat': string,
		}) 
		hint( ): ReturnType< $mol_chat['title'] >
		sub( ): readonly(any)[]
		pages( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=chat.view.tree.d.ts.map