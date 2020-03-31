namespace $.$${
	export class $mol_movabble_demo extends $.$mol_movabble_demo{
		
		dynamic(){
			return `X: ${this.Box().pos_x()} Y: ${this.Box().pos_y()}`;
		}

		hook_up(){
			(this.dom_node() as HTMLElement).style.opacity = '1';
		}

		hook_down(){
			(this.dom_node() as HTMLElement).style.opacity = '0.5';
		}
	}
}
