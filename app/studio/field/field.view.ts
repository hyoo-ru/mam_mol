namespace $.$$ {
	
	export class $mol_app_studio_field extends $.$mol_app_studio_field {

		prop_current( next? : $mol_tree ) {
			return this.prop( this.path() , next ) as $mol_tree
		}

		title() {
			const path = this.path().slice()
			if( [ '/' , '*' , '<=' , '<=>' , '@' , '' , null ].indexOf( path[ path.length - 1 ] ) >= 0 ) path.pop()
			return String( path.pop() )
		}

		title_arg() {
			return this.prop_arg( this.path() )
		}

		value( next? : $mol_tree ) {
			return this.prop_current( next )
		}

		type( next? : string ) {
			if( next ) {
				let val
				switch( next ) {
					case 'null' : val = new $mol_tree({ type : 'null' }); break
					case 'bool' : val = new $mol_tree({ type : 'false' }); break
					case 'number' : val = new $mol_tree({ type : 'NaN' }); break
					case 'string' : val = new $mol_tree({}); break
					case 'locale' : val = new $mol_tree({ type : '@' , sub : [ new $mol_tree({}) ] }); break
					case 'get' : val = new $mol_tree({ type : '<=' , sub : [ new $mol_tree({ type : '?' }) ] }); break
					case 'bind' : val = new $mol_tree({ type : '<=>' , sub : [ new $mol_tree({ type : '?' }) ] }); break
					case 'list' : val = new $mol_tree({ type : '/' }); break
					case 'dict' : val = new $mol_tree({ type : '*' }); break
					case 'object' : val = new $mol_tree({ type : '$mol_view' }); break
					default : throw new Error( `Unsupported type: ${ next }` )
				}
				this.value( val )
			}
			const val = this.value()
			if( !val || val.type === '-' ) return
			
			return $mol_view_tree_value_type( this.value() )
		}

		@ $mol_mem
		expanded( next = [ 'bool' , 'number' , 'string' , 'locale' ].indexOf( this.type() ) >= 0 ) {
			return next
		}

		class( next? : string ) {
			return this.value( next && new $mol_tree({ type : next }) ).type
		}

		bind( next? : string ) {
			return this.value( next && this.value().clone({ sub : [ new $mol_tree({ type : next , sub : [ new $mol_tree({ type : '-' }) ] }) ] }) ).sub[0].type
		}

		value_bool( next? : string ) {
			return this.value( next === undefined ? undefined : new $mol_tree({ type : String( next ) }) ).type
		}

		value_number( next? : string ) {
			return this.value( next === undefined ? undefined : new $mol_tree({ type : String( next ) }) ).type
		}

		value_string( next? : string ) {
			let next2
			if( next !== undefined ) {
				next2 = new $mol_tree({ value : next })
				if( this.type() === 'locale' ) next2 = new $mol_tree({ type : '@' , sub : [ next2 ] })
			}
			return this.value( next2 ).value
		}

		pairs() {
			return this.value().sub.map( pair => this.Prop([ ... this.path() , pair.type , null ]) )
		}

		overs() {
			return this.value().sub.map( over => this.Prop([ ... this.path() , over.type , null ]) )
		}

		hint() {
			return this.prop_value( this.path() )
		}

		tools() {
			const type = this.type()
			return [
				this.Type() ,
				... ( type === 'get' ) ? [ this.Bind() ] : [] ,
				... ( type === 'bind' ) ? [ this.Bind() ] : [] ,
				... ( [ 'object' ].indexOf( type ) >= 0 ) ? [ this.Object() ] : [] ,
			]
		}

		content() {
			const type = this.type()
			return [
				( type === 'bool' ) ? this.Bool() : null ,
				( type === 'number' ) ? this.Number() : null ,
				( type === 'string' ) ? this.String() : null ,
				( type === 'locale' ) ? this.String() : null ,
				( type === 'list' ) ? this.List() : null ,
				( type === 'dict' ) ? this.Dict() : null ,
				( type === 'object' ) ? this.Overs() : null ,
				... ( [ 'get' , 'bind' ].indexOf( type ) >= 0 && this.bind() ) ? [ this.Prop([ this.Bind().value() , null ]) ] : [] ,
			]
		}

		@ $mol_mem_key
		item_value( index : number , next? : string ) {
			return next
		}

		@ $mol_mem_key
		item_class( index : number , next? : string ) {
			return next
		}

		@ $mol_mem
		list_rows() {
			return this.value().sub.map( ( item , index )=> this.Prop([ ... this.path() , index ]) )
		}

		prop_path( path : $mol_tree_path ) {
			return path
		}

		add_item( type? : string ) : string {
			if( !type ) return null
			
			const items = this.value()
			this.value( items.insert( new $mol_tree({ type }) , items.sub.length ) )

			this.list_rows()[ items.sub.length ].type( type )

			return null
		}

		over_options() {
			return ( this.props( this.class() ) as $mol_tree ).sub.map( item => item.type )
		}

		add_over( name? : string ) : string {
			if( !name ) return null
			
			this.value( this.value().insert( new $mol_tree({ type : name }) , name ) )

			return null
		}

		add_pair( event? : Event ) : string {
			if( !event ) return
			
			const name = this.add_pair_key()
			this.add_pair_key( '' )
			this.value( this.value().insert( new $mol_tree , name , null ) )
		}

		event_prop_add( event? : Event ) {
			const name = this.Bind().filter_pattern()
			this.prop_add( name )
			this.Bind().value( name )
			this.Bind().filter_pattern( '' )
		}

	}

}
