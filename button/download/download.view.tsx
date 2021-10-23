/** @jsx $mol_jsx */
namespace $.$$ {
	export class $mol_button_download extends $.$mol_button_download {
		
		click() {
			
			const blob = this.blob()
			const name = this.file_name()
			const uri = URL.createObjectURL( blob )
			
			const a = <a href={ uri } download={ name }></a>
			a.click()

		}
		
	}
}
