namespace $.$$ {
	export class $hyoo_sandbox_movable_demo extends $.$hyoo_sandbox_movable_demo {

		coordinates() {
			return `X: ${this.Box().pos_x()} Y: ${this.Box().pos_y()}`;
		}

		start() {
			console.log('hook start')
		}

		done() {
			console.log('hook done')
		}

	}
}
