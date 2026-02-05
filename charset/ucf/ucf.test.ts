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
			check( 'мир', [ 0x88, 0x3C, 0xE2, 0x40, 0xF8 ] )
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
		
		"2B Emoji"( $ ) {
			check( '🏴', [ 0xFF, 0x74, 0x4B, 0x81 ] )
		},
		
		"2B Emoji with 1B modifiers"( $ ) {
			check( '🏴‍☠', [ 0xFF, 0x74, 0x4B, 0xC1, 0x0D, 0x8C, 0xA9, 0xB4 ] )
		},
		
		"2B Emoji with 3B Tag"( $ ) {
			check( '🏴\u{E007F}', [ 0xFF, 0x74, 0x4B, 0xF8, 0x7F, 0x00, 0xF3, 0x89 ] )
		},
		
		"Mixed scripts"( $ ) {
			check( 'allô 美しい мир, 🏴‍☠\n', [
				0x61, 0x6C, 0x6C, 0x6F, 0xEA, 0x20, // allô 
				0xF9, 0x0E, 0x63, 0xE7, 0x57, 0x44, 0x20, // 美しい 
				0xA8, 0x3C, 0xE2, 0x40, 0x2C, 0x20, // мир, 
				0xF7, 0x74, 0x4B, 0xC1, 0x0D, 0x8C, 0xA9, 0x0A, // 🏴‍☠\n
				0xB4,
			] )
		},
		
		"Wrong ending"( $ ) {
			const bin = new Uint8Array([ 0x88, 0x3C, 0xE2, 0x40 ])
			const error = $mol_assert_fail( ()=> $mol_charset_ucf_decode( bin ), 'Wrong ending' )
			$mol_assert_equal( error.cause.mode, 166 )
			$mol_assert_equal( error.cause.text, 'мир' )
		},
		
		"Wrong byte"( $ ) {
			const bin = new Uint8Array([ 0xFF, 0x74, 0x4B, 0x74, 0x9B, 0x81 ])
			const error = $mol_assert_fail( ()=> $mol_charset_ucf_decode( bin ), 'Wrong byte' )
			$mol_assert_equal( error.cause.pos, 4 )
			$mol_assert_equal( error.cause.text, '🏴' )
		},
		
	})
}
