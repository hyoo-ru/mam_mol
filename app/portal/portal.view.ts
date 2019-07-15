namespace $.$$ {
	export class $mol_app_portal extends $.$mol_app_portal {
		pages() {
			switch( this.$.$mol_state_arg.value( 'app' ) ) {
				case 'habhub' : return [ this.Menu() , ... this.Habhub_app().pages() ]
				case 'files' : return [ this.Menu() , ... this.Files_app().pages() ]
				case 'supplies' : return [ this.Menu() , ... this.Supplies_app().pages() ]
				default : return [ this.Menu() ]
			}
		}

	}
}
