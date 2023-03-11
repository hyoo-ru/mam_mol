namespace $.$$ {
	
	export class $mol_app_demo_menu extends $.$mol_app_demo_menu {

		@ $mol_mem
		override filter( next?: string ) {
			return this.$.$mol_state_session.value( 'filter' , next === '' ? null : next ) ?? super.filter() as string
		}
		
		@ $mol_mem
		override options() {
			return this.names().map( id => this.Option( id ) )
		}
		
		override option_arg( id: string ) {
			return { 'demo' : id }
		}
		
		override option_title( id: string ) {
			return '$'+ id.replace( '_demo_', '/' ).replace( '_demo', '' )
		}
		
	}
	
}
