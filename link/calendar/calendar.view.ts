namespace $.$$ {
	export class $mol_link_calendar extends $.$mol_link_calendar {
		
		@ $mol_mem
		uri() {
			const params = new URLSearchParams({
				dates: `${ this.interval().start.merge({ second: 0 }).toString( 'YYYYMMDDThhmmssZ' ) }/${ this.interval().end.merge({ second: 0 }).toString( 'YYYYMMDDThhmmssZ' ) }`,
				text: this.title(),
				details: this.details(),
				location: this.location(),
			})
			return `https://calendar.google.com/calendar/u/0/r/eventedit?${ params.toString() }`
		}
		
	}
}
