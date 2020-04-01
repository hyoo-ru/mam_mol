namespace $.$$ {
	export class $mol_grip extends $.$mol_grip {
		@$mol_mem
		pos_y(val?: number): number {
			return (val !== void 0) ? val : NaN;
		}
		@$mol_mem
		pos_x(val?: number): number {
			return (val !== void 0) ? val : NaN;
		}
		move(node: HTMLElement, callback = (event: PointerEvent) => {
			this.pos_x(event.pageX)
			this.pos_y(event.pageY)
		}) {
			const pointerdown = (event: PointerEvent) => {
				if (event.which !== 1) return;
				event.preventDefault();
				const onpointerup = () => {
					window.removeEventListener('pointermove', callback, false);
					window.removeEventListener('pointerup', onpointerup, false);
					this.done()
				};
				this.start()
				window.addEventListener('pointermove', callback, false);
				window.addEventListener('pointerup', onpointerup, false);
			}
			node.addEventListener('pointerdown', pointerdown, false);
			return {
				destroy() {
					node.removeEventListener('pointerdown', onpointerdown, false);
				}
			};
		}

		dom_node_actual() {
			this.move(this.dom_node() as HTMLElement)
			return super.dom_node_actual();
		}

	}
}
