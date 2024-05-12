	($.$mol_code_demo) = class $mol_code_demo extends ($.$mol_example_small) {
		Qr(){
			const obj = new this.$.$mol_code();
			(obj.format) = () => ("QR_CODE");
			return obj;
		}
		Matrix(){
			const obj = new this.$.$mol_code();
			(obj.format) = () => ("DATA_MATRIX");
			return obj;
		}
		Upc_e(){
			const obj = new this.$.$mol_code();
			(obj.format) = () => ("UPC_E");
			return obj;
		}
		Upc_a(){
			const obj = new this.$.$mol_code();
			(obj.format) = () => ("UPC_A");
			return obj;
		}
		Ean_8(){
			const obj = new this.$.$mol_code();
			(obj.format) = () => ("EAN_8");
			return obj;
		}
		Ean_13(){
			const obj = new this.$.$mol_code();
			(obj.format) = () => ("EAN_13");
			return obj;
		}
		Code_128(){
			const obj = new this.$.$mol_code();
			(obj.format) = () => ("CODE_128");
			return obj;
		}
		Code_39(){
			const obj = new this.$.$mol_code();
			(obj.format) = () => ("CODE_39");
			return obj;
		}
		Itf(){
			const obj = new this.$.$mol_code();
			(obj.format) = () => ("ITF");
			return obj;
		}
		title(){
			return "Barcode scanner with various formats support";
		}
		sub(){
			return [
				(this?.Qr()), 
				(this?.Matrix()), 
				(this?.Upc_e()), 
				(this?.Upc_a()), 
				(this?.Ean_8()), 
				(this?.Ean_13()), 
				(this?.Code_128()), 
				(this?.Code_39()), 
				(this?.Itf())
			];
		}
		tags(){
			return [
				"qrcode", 
				"barcode", 
				"scan", 
				"cordova"
			];
		}
		aspects(){
			return ["Widget/Control"];
		}
	};
	($mol_mem(($.$mol_code_demo.prototype), "Qr"));
	($mol_mem(($.$mol_code_demo.prototype), "Matrix"));
	($mol_mem(($.$mol_code_demo.prototype), "Upc_e"));
	($mol_mem(($.$mol_code_demo.prototype), "Upc_a"));
	($mol_mem(($.$mol_code_demo.prototype), "Ean_8"));
	($mol_mem(($.$mol_code_demo.prototype), "Ean_13"));
	($mol_mem(($.$mol_code_demo.prototype), "Code_128"));
	($mol_mem(($.$mol_code_demo.prototype), "Code_39"));
	($mol_mem(($.$mol_code_demo.prototype), "Itf"));

//# sourceMappingURL=demo.view.tree.js.map