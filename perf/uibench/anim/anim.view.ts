namespace $.$$ {
	
	export class $mol_perf_uibench_anim extends $.$mol_perf_uibench_anim {
		
		state() {
			return { items : [] as any[] }
		}
		
		boxes() {
			return this.state().items.map( ( v : any , i : number )=> this.Box( i ) )
		}
		
		@ $mol_mem_key
		box_state( index : number ) {
			return this.state().items[ index ] || { id : '' , time : 0 }
		}
		
	}

	export class $mol_perf_uibench_anim_box extends $.$mol_perf_uibench_anim_box {

		state() {
			return { id : '' , time : 0 }
		}

		id() {
			return this.state().id
		}

		time() {
			return this.state().time
		}

		style_radius() {
			return `${this.time() % 10}px`
		}

		style_color() {
			return `rgba(0,0,0,${0.5 + ((this.time() % 10) / 10)})`
		}

	}

}
