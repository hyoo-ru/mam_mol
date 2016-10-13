module $.$mol {
	export class $mol_app_inventory extends $.$mol_app_inventory {
		
		@ $mol_prop()
		model() {
			return new $mol_app_inventory_model()
		}
		
		childs() {
			let content: Array<$mol_viewer> = [];
			
			if(!this.model().isLoggedIn()) {
				return [this.login()] 
			}
			
			switch(this.role()) {
				case 'stockman': content = [this.stockman()]; break;
				case 'inspector': content = [this.inspector()]; break;
				case 'statistics': content = [this.statistics()]; break;
			}
			
			return content;
		}
		
		@ $mol_prop()
		role(...diff: string[]) {
			if(diff[0] === 'logout') {
				return this.model().isLoggedIn(false);
			}
			return $mol_state_arg.value( 'role' , ...diff ) || 'stockman';
		}
	}
}
