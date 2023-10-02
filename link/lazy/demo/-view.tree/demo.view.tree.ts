namespace $ {
	export class $mol_link_lazy_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Lazy generated link
		 * ```
		 */
		title() {
			return "Lazy generated link"
		}
		
		/**
		 * ```tree
		 * sub / <= Download
		 * ```
		 */
		sub() {
			return [
				this.Download()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\icon
		 * 	\link
		 * 	\lazy
		 * 	\download
		 * ```
		 */
		tags() {
			return [
				"icon",
				"link",
				"lazy",
				"download"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget/Button
		 * ```
		 */
		aspects() {
			return [
				"Widget/Button"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * uri_generated \
		 * ```
		 */
		uri_generated() {
			return ""
		}
		
		/**
		 * ```tree
		 * download_file \generated.csv
		 * ```
		 */
		download_file() {
			return "generated.csv"
		}
		
		/**
		 * ```tree
		 * Download_icon $mol_icon_download
		 * ```
		 */
		@ $mol_mem
		Download_icon() {
			const obj = new this.$.$mol_icon_download()
			
			return obj
		}
		
		/**
		 * ```tree
		 * download_label \Download
		 * ```
		 */
		download_label() {
			return "Download"
		}
		
		/**
		 * ```tree
		 * Download $mol_link_lazy
		 * 	hint <= title
		 * 	uri_generated <= uri_generated
		 * 	file_name <= download_file
		 * 	sub /
		 * 		<= Download_icon
		 * 		<= download_label
		 * ```
		 */
		@ $mol_mem
		Download() {
			const obj = new this.$.$mol_link_lazy()
			
			obj.hint = () => this.title()
			obj.uri_generated = () => this.uri_generated()
			obj.file_name = () => this.download_file()
			obj.sub = () => [
				this.Download_icon(),
				this.download_label()
			] as readonly any[]
			
			return obj
		}
	}
	
}

