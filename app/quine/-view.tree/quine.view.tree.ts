namespace $ { export class $mol_app_quine extends $mol_page {

	/**
	 *  ```
	 *  title @ \Quine - Application that prints self sources
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_app_quine_title" )
	}

	/**
	 *  ```
	 *  body / <= Content
	 *  ```
	 **/
	body() {
		return [].concat( this.Content() )
	}

	/**
	 *  ```
	 *  Content $mol_row sub / <= Text
	 *  ```
	 **/
	@ $mol_mem
	Content() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.Text() )
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Text $mol_text text <= content
	 *  ```
	 **/
	@ $mol_mem
	Text() {
		return (( obj )=>{
			obj.text = () => this.content()
			return obj
		})( new this.$.$mol_text(  ) )
	}

	/**
	 *  ```
	 *  content \
	 *  ```
	 **/
	content() {
		return ""
	}

	/**
	 *  ```
	 *  paths /
	 *  	\mol/app/quine/quine.view.tree
	 *  	\mol/app/quine/quine.view.ts
	 *  	\mol/app/quine/index.html
	 *  	\mol/app/quine/quine.locale=ru.json
	 *  ```
	 **/
	paths() {
		return [].concat( "mol/app/quine/quine.view.tree" , "mol/app/quine/quine.view.ts" , "mol/app/quine/index.html" , "mol/app/quine/quine.locale=ru.json" )
	}

} }

