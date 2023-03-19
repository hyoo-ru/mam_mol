/** @jsx $mol_jsx */
namespace $.$$ {

	/**
	 * Button download file from uri() or a blob()
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
	 */
	export class $mol_button_download extends $.$mol_button_download {

		@ $mol_mem
		uri() {
			return URL.createObjectURL( this.blob() )
		}
		
		click() {
			
			const a = <a
				href={ this.uri() }
				download={ this.file_name() }
			></a>
			
			a.click()
			
		}
		
	}
}
