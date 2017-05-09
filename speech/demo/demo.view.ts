namespace $.$mol {
	
	export class $mol_speech_demo extends $.$mol_speech_demo {
		
		listening( next? : boolean ) {
			return $mol_speech.listening( next )
		}
		
		message() {
			return $mol_speech.text()
		}
		
	}
	
}
