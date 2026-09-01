namespace $ {

	/** Russian alphabet in lowercase **/
	export type $mol_type_alphabet_ru_lower =
		| 'а' | 'б' | 'в' | 'г' | 'д' | 'е'
		| 'ё' | 'ж' | 'з' | 'и' | 'й' | 'к'
		| 'л' | 'м' | 'н' | 'о' | 'п' | 'р'
		| 'с' | 'т' | 'у' | 'ф' | 'х' | 'ц'
		| 'ч' | 'ш' | 'щ' | 'ъ' | 'ы' | 'ь'
		| 'э' | 'ю' | 'я'

	/** Russian alphabet in uppercase **/
	export type $mol_type_alphabet_ru_upper =
		Uppercase< $mol_type_alphabet_ru_lower >

	/** Russian alphabet **/
	export type $mol_type_alphabet_ru =
		| $mol_type_alphabet_ru_lower
		| $mol_type_alphabet_ru_upper

}
