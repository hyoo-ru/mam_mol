namespace $ {
	export class $mol_link_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Some hyperlinks
		 * ```
		 */
		title() {
			return "Some hyperlinks"
		}
		
		/**
		 * ```tree
		 * sub / <= Demo_items
		 * ```
		 */
		sub() {
			return [
				this.Demo_items()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_icon
		 * 	\file
		 * 	\download
		 * 	\link
		 * 	\icon
		 * 	\navigation
		 * 	\router
		 * 	\url
		 * ```
		 */
		tags() {
			return [
				"$mol_icon",
				"file",
				"download",
				"link",
				"icon",
				"navigation",
				"router",
				"url"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget/Navigation
		 * ```
		 */
		aspects() {
			return [
				"Widget/Navigation"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * this_label \This page
		 * ```
		 */
		this_label() {
			return "This page"
		}
		
		/**
		 * ```tree
		 * This $mol_link sub / <= this_label
		 * ```
		 */
		@ $mol_mem
		This() {
			const obj = new this.$.$mol_link()
			
			obj.sub = () => [
				this.this_label()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * red_label \Red
		 * ```
		 */
		red_label() {
			return "Red"
		}
		
		/**
		 * ```tree
		 * Red $mol_link
		 * 	arg * color \red
		 * 	sub / <= red_label
		 * ```
		 */
		@ $mol_mem
		Red() {
			const obj = new this.$.$mol_link()
			
			obj.arg = () => ({
				color: "red"
			} as Record< string, any >)
			obj.sub = () => [
				this.red_label()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * green_label \Green
		 * ```
		 */
		green_label() {
			return "Green"
		}
		
		/**
		 * ```tree
		 * Green $mol_link
		 * 	arg * color \green
		 * 	sub / <= green_label
		 * ```
		 */
		@ $mol_mem
		Green() {
			const obj = new this.$.$mol_link()
			
			obj.arg = () => ({
				color: "green"
			} as Record< string, any >)
			obj.sub = () => [
				this.green_label()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * blue_label \Blue
		 * ```
		 */
		blue_label() {
			return "Blue"
		}
		
		/**
		 * ```tree
		 * Blue $mol_link
		 * 	arg * color \blue
		 * 	sub / <= blue_label
		 * ```
		 */
		@ $mol_mem
		Blue() {
			const obj = new this.$.$mol_link()
			
			obj.arg = () => ({
				color: "blue"
			} as Record< string, any >)
			obj.sub = () => [
				this.blue_label()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * external_hint \external link
		 * ```
		 */
		external_hint() {
			return "external link"
		}
		
		/**
		 * ```tree
		 * External $mol_link
		 * 	uri \http://example.org
		 * 	title \example.org
		 * 	hint <= external_hint
		 * ```
		 */
		@ $mol_mem
		External() {
			const obj = new this.$.$mol_link()
			
			obj.uri = () => "http://example.org"
			obj.title = () => "example.org"
			obj.hint = () => this.external_hint()
			
			return obj
		}
		
		/**
		 * ```tree
		 * object_uri \
		 * ```
		 */
		object_uri() {
			return ""
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
		 * Download $mol_link
		 * 	uri <= object_uri
		 * 	file_name \file.csv
		 * 	sub /
		 * 		<= Download_icon
		 * 		<= download_label
		 * ```
		 */
		@ $mol_mem
		Download() {
			const obj = new this.$.$mol_link()
			
			obj.uri = () => this.object_uri()
			obj.file_name = () => "file.csv"
			obj.sub = () => [
				this.Download_icon(),
				this.download_label()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Demo_items $mol_list rows /
		 * 	<= This
		 * 	<= Red
		 * 	<= Green
		 * 	<= Blue
		 * 	<= External
		 * 	<= Download
		 * ```
		 */
		@ $mol_mem
		Demo_items() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.This(),
				this.Red(),
				this.Green(),
				this.Blue(),
				this.External(),
				this.Download()
			] as readonly any[]
			
			return obj
		}
	}
	
}

