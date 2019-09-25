namespace $ { export class $mol_app_issues extends $mol_page {

	/**
	 *  ```
	 *  title @ \Time of unresolving issues of GitHub projects
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_app_issues_title" )
	}

	/**
	 *  ```
	 *  tools / <= Sources
	 *  ```
	 **/
	tools() {
		return [].concat( this.Sources() )
	}

	/**
	 *  ```
	 *  Sources $mol_link_iconed
	 *  	uri \https://github.com/eigenmethod/mol/tree/master/app/issues
	 *  	content /
	 *  ```
	 **/
	@ $mol_mem
	Sources() {
		return (( obj )=>{
			obj.uri = () => "https://github.com/eigenmethod/mol/tree/master/app/issues"
			obj.content = () => [].concat(  )
			return obj
		})( new this.$.$mol_link_iconed(  ) )
	}

	/**
	 *  ```
	 *  body /
	 *  	<= Projects
	 *  	<= Chart
	 *  	<= Description
	 *  ```
	 **/
	body() {
		return [].concat( this.Projects() , this.Chart() , this.Description() )
	}

	/**
	 *  ```
	 *  Projects $mol_row sub <= projects
	 *  ```
	 **/
	@ $mol_mem
	Projects() {
		return (( obj )=>{
			obj.sub = () => this.projects()
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  projects /
	 *  ```
	 **/
	projects() {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Chart $mol_plot_pane
	 *  	gap_left 76
	 *  	graphs /
	 *  		<= Capacities
	 *  		<= Capacities_ruler
	 *  		<= Capacities_ruler_hor
	 *  ```
	 **/
	@ $mol_mem
	Chart() {
		return (( obj )=>{
			obj.gap_left = () => 76
			obj.graphs = () => [].concat( this.Capacities() , this.Capacities_ruler() , this.Capacities_ruler_hor() )
			return obj
		})( new this.$.$mol_plot_pane(  ) )
	}

	/**
	 *  ```
	 *  Capacities $mol_plot_bar series_y <= capacities
	 *  ```
	 **/
	@ $mol_mem
	Capacities() {
		return (( obj )=>{
			obj.series_y = () => this.capacities()
			return obj
		})( new this.$.$mol_plot_bar(  ) )
	}

	/**
	 *  ```
	 *  capacities /number
	 *  ```
	 **/
	capacities() {
		return [].concat(  ) as readonly ( number )[]
	}

	/**
	 *  ```
	 *  Capacities_ruler $mol_plot_ruler_vert title \Age, days
	 *  ```
	 **/
	@ $mol_mem
	Capacities_ruler() {
		return (( obj )=>{
			obj.title = () => "Age, days"
			return obj
		})( new this.$.$mol_plot_ruler_vert(  ) )
	}

	/**
	 *  ```
	 *  Capacities_ruler_hor $mol_plot_mark_hor
	 *  	title \Project
	 *  	labels <= project_labels
	 *  ```
	 **/
	@ $mol_mem
	Capacities_ruler_hor() {
		return (( obj )=>{
			obj.title = () => "Project"
			obj.labels = () => this.project_labels()
			return obj
		})( new this.$.$mol_plot_mark_hor(  ) )
	}

	/**
	 *  ```
	 *  project_labels /string
	 *  ```
	 **/
	project_labels() {
		return [].concat(  ) as readonly ( string )[]
	}

	/**
	 *  ```
	 *  Description $mol_view sub / <= description
	 *  ```
	 **/
	@ $mol_mem
	Description() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.description() )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  description @ \Sum of ages of all open issues. Lower is better.
	 *  ```
	 **/
	description() {
		return this.$.$mol_locale.text( "$mol_app_issues_description" )
	}

	/**
	 *  ```
	 *  Project!index $mol_app_issues_project id?val <=> project_id!index?val
	 *  ```
	 **/
	@ $mol_mem_key
	Project( index : any ) {
		return (( obj )=>{
			obj.id = ( val? : any ) => this.project_id(index , val )
			return obj
		})( new this.$.$mol_app_issues_project(  ) )
	}

	/**
	 *  ```
	 *  project_id!index?val \
	 *  ```
	 **/
	@ $mol_mem_key
	project_id( index : any , val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

} }

namespace $ { export class $mol_app_issues_project extends $mol_view {

	/**
	 *  ```
	 *  capacity 0
	 *  ```
	 **/
	capacity() {
		return 0
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Input
	 *  	<= Capacity
	 *  ```
	 **/
	sub() {
		return [].concat( this.Input() , this.Capacity() )
	}

	/**
	 *  ```
	 *  Input $mol_view sub /
	 *  	<= Id
	 *  	<= Homepage
	 *  ```
	 **/
	@ $mol_mem
	Input() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.Id() , this.Homepage() )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Id $mol_string
	 *  	hint \username/repo
	 *  	value?val <=> id?val
	 *  	debounce 1000
	 *  ```
	 **/
	@ $mol_mem
	Id() {
		return (( obj )=>{
			obj.hint = () => "username/repo"
			obj.value = ( val? : any ) => this.id( val )
			obj.debounce = () => 1000
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  id?val \
	 *  ```
	 **/
	@ $mol_mem
	id( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Homepage $mol_link_iconed
	 *  	uri <= homepage
	 *  	content /
	 *  ```
	 **/
	@ $mol_mem
	Homepage() {
		return (( obj )=>{
			obj.uri = () => this.homepage()
			obj.content = () => [].concat(  )
			return obj
		})( new this.$.$mol_link_iconed(  ) )
	}

	/**
	 *  ```
	 *  homepage \
	 *  ```
	 **/
	homepage() {
		return ""
	}

	/**
	 *  ```
	 *  Capacity $mol_view
	 *  	minimal_height 80
	 *  	minimal_width 80
	 *  	sub / <= capacity_text
	 *  ```
	 **/
	@ $mol_mem
	Capacity() {
		return (( obj )=>{
			obj.minimal_height = () => 80
			obj.minimal_width = () => 80
			obj.sub = () => [].concat( this.capacity_text() )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  capacity_text \
	 *  ```
	 **/
	capacity_text() {
		return ""
	}

} }

