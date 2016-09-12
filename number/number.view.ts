module $.$mol {
	export class $mol_number extends $.$mol_number {

		eventDec(...diff: Event[]) {
			this.value(+this.value() - this.precisionChange());
		}

		eventInc(...diff: Event[]) {
			this.value(+this.value() + this.precisionChange());
		}

		valueFixed(...diff: string[]) {				
			if(diff[0] !== void 0) {
				this.value(diff[0] === '' ? null : +diff[0]);
			}
			
			var precisionView = this.precisionView();
			var value = diff[0] ? +diff[0] : this.value();
			
			if(value === null) {
				return '';
			}
			
			if(precisionView >= 1) {
				return (value / precisionView).toFixed();
			} else {
				var fixedNumber = Math.log(1/precisionView)/Math.log(10);
				return value.toFixed(fixedNumber);
			}				
		}

	}
}
