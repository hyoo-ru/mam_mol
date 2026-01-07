namespace $.$$ {
	
	function check( text: string, bytes: number[] ) {
		
		const ideal = new Uint8Array( bytes )
		const actual = $mol_charset_ucf_encode( text )
		
		$mol_assert_equal( $mol_charset_ucf_decode( actual ), text )
		$mol_assert_equal( actual, ideal )
		
	}
	
	$mol_test({
		
		"Full ASCII compatible"( $ ) {
			check( 'hi', [ 0x68, 0x69 ] )
		},
		
		"1B ASCII with diacritic"( $ ) {
			check( 'allo\u0302', [ 0x61, 0x6C, 0x6C, 0x6F, 0xEA ] )
		},
		
		"1B Cyrillic"( $ ) {
			check( 'мир', [ 0x88, 0x3C, 0xE2, 0x40, 0x96 ] )
		},
		
		"1B Cyrillic with nummbers and punctuation"( $ ) {
			check( 'м.1', [ 0x88, 0x3C, 0x2E, 0x31, 0xF8 ] )
		},
		
		"2B Kanji"( $ ) {
			check( '美', [ 0xF9, 0x0E, 0x63, 0x87 ] )
		},
		
		"3B rare Kanji"( $ ) {
			check( '𲎯', [ 0xF7, 0x2F, 0x47, 0x0C, 0x89 ] )
		},
		
		"1B Kana"( $ ) {
			check( 'しい', [ 0xE0, 0x57, 0x44, 0xA0 ] )
		},
		
		"2B Emoji with 1B modifiers"( $ ) {
			check( '🏴', [ 0xFF, 0x74, 0x4B, 0x81 ] )
			check( '🏴‍☠', [ 0xFF, 0x74, 0x4B, 0xC1, 0x0D, 0x8C, 0xA9, 0x8B ] )
		},
		
		"Mixed scripts"( $ ) {
			check( 'allô 美しい мир, 🏴‍☠\n', [
				0x61, 0x6C, 0x6C, 0x6F, 0xEA, 0x20, // allo\u0302 
				0x8F, 0x0E, 0x63, 0xE7, 0x57, 0x44, 0x20, // 美しい 
				0xA8, 0x3C, 0xE2, 0x40, 0x2C, 0x20, // мир, 
				0x95, 0x74, 0x4B, 0xC1, 0x0D, 0x8C, 0xA9, 0x0A, // 🏴‍☠\n
				0x8B,
			] )
		},
		
	})
}
