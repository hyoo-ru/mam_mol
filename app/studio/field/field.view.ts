namespace $.$mol {
	
	export class $mol_app_studio_field extends $.$mol_app_studio_field {

		controls() {
			const type = this.type()
			return [
				( type === 'bool' ) ? this.Bool() : null ,
				( type === 'number' ) ? this.Number() : null ,
				( type === 'string' ) ? this.String() : null ,
				( type === 'string' ) ? this.String() : null ,
				( type === 'locale' ) ? this.String() : null ,
				( type === 'object' ) ? this.Object() : null ,
				( type === 'get' ) ? this.Prop() : null ,
				( type === 'bind' ) ? this.Prop() : null ,
				( type === 'list' ) ? this.List() : null ,
			]
		}

		rows() {
			return [ this.Item( 0 ) ]
		}

	}

}
