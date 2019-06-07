namespace $.$$ {
	
	export class $mol_speech_demo extends $.$mol_speech_demo {
		
		hearing( next? : boolean ) {
			return $mol_speech.hearing( next )
		}
		
		message() {
			let text = $mol_speech.text()
				.replace( /ё/g , 'е' )
				.replace( /^.*? сотри все (пожалуйста|приз|please)\s*/ , '' )
				.replace( /\s*точка/g , '.' )
				.replace( /\s*запятая/g , ',' )
				.replace( /\s*восклицательный знак/g , '!' )
				.replace( /\s*вопросительный знак/g , '?' )
				.replace( /\s*точка с запятой/g , ';' )
				.replace( /\s*двоеточие/g , ':' )
				.replace( /\s*тире/g , ' -' )
				.replace( /\s*новая строка/g , ' \n' )
			
			while( true ) {
				let text2 = text
					.replace( /\s+?\S+ сотри слово (пожалуйста|плиз|please)/ , '' )
					.replace( /^(.*?) сотри (\d+) (слово|слова|слов) (пожалуйста|плиз|please)/ , ( str , text , count )=> text.replace( new RegExp( `(\\s\\S+){${ count }}$` ) , '' ) )
				if( text === text2 ) break
				text = text2
			}
			
			return text
				.replace( /цитата (.*?) конец цитаты/g , ' "$1"' )
				.replace( /(?:^|[.!?]\s)\S/g , str => str.toUpperCase() )
		}

		speak() {
			$mol_speech.say( this.message() )
		}
		
	}
	
}
