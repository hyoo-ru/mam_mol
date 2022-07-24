namespace $ {
	
	export type $mol_harp_query<
		Field extends string = string
	> = {
		[ field in Field ]: $mol_harp_query<never>
	} & {
		'+'?: boolean // asc order or not
		'='?: any[][] // only list of ranges
		'@'?: any[][] // except list of ranges
	}
	
}
