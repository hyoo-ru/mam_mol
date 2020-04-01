namespace $.$$ {
	export class $mol_splitter extends $.$mol_splitter {
		@$mol_mem
		size(val?: any) {
			return (val !== void 0) ? val : 0
		}
		orientation() {
			return this.type() == 'vertical' ? 'height' : 'width'
		}
		set_style_for_sibling(node: string, val: string) {
			(this.dom_node()[`${node}ElementSibling`] as HTMLElement).style[this.orientation()] = val;
		}
		@$mol_mem
		pos(val?: any) {
			const min = 100 * (40 / this.size());
			const max = 100 - min;
			val = (val !== void 0) ? val : 50;
			val = this.clamp(val, min, max);

			this.set_style_for_sibling('previous', `${val}%`);
			this.set_style_for_sibling('next', `${100 - val}%`);
			return val
		}

		pos_y(val?: number) {
			if (this.type() == 'vertical')
				this.setPos(val, 'vertical')
		}
		pos_x(val?: number) {
			if (this.type() == 'horizontal')
				this.setPos(val, 'horizontal')
		}

		clamp(num: number, min: number, max: number) {
			return num < min ? min : num > max ? max : num;
		}

		node() {
			return (this.dom_node().parentNode as HTMLElement);
		}
		setPos(pos: number, type: string) {
			const { top, left } = this.node().getBoundingClientRect();
			const px = type === 'vertical' ? (pos - top) : (pos - left);
			this.pos(100 * px / this.size(this.type() === 'vertical' ? this.node().clientHeight : this.node().clientWidth));
		}

		sub() {
			(this.dom_node() as HTMLElement).style['flex-direction'] = this.type() == 'horizontal' ? 'row' : 'column'
			return [this.Divider()] as readonly any[]
		}
		divider_style() {
			return {
				[this.type() == 'horizontal' ? 'height' : 'width']: '100%',
				['padding']: this.type() == 'horizontal' ? '0 2px' : '2px 0',
				['cursor']: this.type() == 'horizontal' ? 'ew-resize' : 'ns-resize'
			}
		}

		@$mol_mem
		Divider() {
			return ((obj) => {
				obj.style = () => this.divider_style(),
					obj.sub = () => [""] as readonly any[]
				return obj
			})(new this.$.$mol_view())
		}
	}
}
