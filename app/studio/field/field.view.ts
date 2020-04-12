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
			if( !val || val.type === '-' ) return null
			
			return $mol_view_tree_value_type( this.value() )
		}

		@ $mol_mem
		expanded( next = [ 'bool' , 'number' , 'string' , 'locale' ].indexOf( this.type() || '' ) >= 0 ) {
			return next
		}

		class( next? : string ) {
			return this.value( next && new $mol_tree({ type : next }) || undefined ).type
		}

		bind( next? : string ) {
			return this.value( next && this.value().clone({ sub : [ new $mol_tree({ type : next , sub : [ new $mol_tree({ type : '-' }) ] }) ] }) || undefined ).sub[0].type
		}

		value_bool( next? : string ) {
			return this.value( next && new $mol_tree({ type : String( next ) }) || undefined ).type
		}

		value_number( next? : string ) {
			return this.value( next && new $mol_tree({ type : String( next ) }) || undefined ).type
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
			return [ ... this.value().sub.map( pair => this.Prop([ ... this.path() , pair.type , null ]) ) , this.Add_pair() ]
		}

		overs() {
			return [ ... this.value().sub.map( over => this.Prop([ ... this.path() , over.type , null ]) ) , this.Add_over() ]
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
				... ( [ 'object' ].indexOf( type ?? '' ) >= 0 ) ? [ this.Object() ] : [] ,
			]
		}

		content() {
			const type = this.type()
			return [
				... ( type === 'bool' ) ? [ this.Bool() ] : [] ,
				... ( type === 'number' ) ? [ this.Number() ] : [] ,
				... ( type === 'string' ) ? [ this.String() ] : [] ,
				... ( type === 'locale' ) ? [ this.String() ] : [] ,
				... ( type === 'list' ) ? [ this.List() ] : [] ,
				... ( type === 'dict' ) ? [ this.Dict() ] : [] ,
				... ( type === 'object' ) ? [ this.Overs() ] : [] ,
				... ( [ 'get' , 'bind' ].indexOf( type ?? '' ) >= 0 && this.bind() ) ? [ this.Prop([ this.Bind().value() , null ]) ] : [] ,
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
			return [ ... this.value().sub.map( ( item , index )=> this.Prop([ ... this.path() , index ]) ) , this.Add() ]
		}

		prop_path( path : $mol_tree_path ) {
			return path
		}

		add_item( type? : string ) {
			if( !type ) return null
			
			const items = this.value()
			this.value( items.insert( new $mol_tree({ type }) , items.sub.length ) )

			// this.list_rows()[ items.sub.length ].type( type )

			return null
		}

		over_options() {
			return ( this.props( this.class() ) as $mol_tree ).sub.map( item => item.type )
		}

		add_over( name? : string ) {
			if( !name ) return
			
			this.value( this.value().insert( new $mol_tree({ type : name }) , name ) )
		}

		add_pair( event? : Event ) {
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
