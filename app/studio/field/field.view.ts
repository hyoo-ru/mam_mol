namespace $.$$ {
	
	export class $mol_app_studio_field extends $.$mol_app_studio_field {
		
		rows() {
			return [
				this.Label(),
				... this.expanded() ? [ this.Value() ] : [],
			]
		}

		prop_current( next? : $mol_tree2 ) {
			return this.prop( this.path() , next ) as $mol_tree2
		}

		title() {
			const path = this.path().slice()
			if( [ '/' , '*' , '<=' , '<=>' , '@' , '' , null ].indexOf( path[ path.length - 1 ] ) >= 0 ) path.pop()
			return String( path.pop() )
		}

		title_arg() {
			return this.prop_arg( this.path() )
		}

		value( next? : $mol_tree2 ) {
			return this.prop_current( next )
		}

		@ $mol_mem
		type( next? : string ) {
			if( next ) {
				let val
				switch( next ) {
					case 'null' : val = $mol_tree2.struct( 'null' ); break
					case 'bool' : val = $mol_tree2.struct( 'false' ); break
					case 'number' : val = $mol_tree2.struct( 'NaN' ); break
					case 'string' : val = $mol_tree2.data(''); break
					case 'locale' : val = $mol_tree2.struct( '@' , [ $mol_tree2.struct('') ] ); break
					case 'get' : val = $mol_tree2.struct( '<=' , [ $mol_tree2.struct( '?' ) ] ); break
					case 'bind' : val = $mol_tree2.struct( '<=>' , [ $mol_tree2.struct( '?' ) ] ); break
					case 'list' : val = $mol_tree2.struct( '/' ); break
					case 'dict' : val = $mol_tree2.struct( '*' ); break
					case 'object' : val = $mol_tree2.struct( '$mol_view' ); break
					default : throw new Error( `Unsupported type: ${ next }` )
				}
				this.value( val )
			}
			const val = this.value()
			if( !val || val.type === '-' ) return ''
			
			return this.$.$mol_view_tree2_value_type( this.value() )
		}

		@ $mol_mem
		expanded( next = [ 'bool' , 'number' , 'string' , 'locale' ].indexOf( this.type() || '' ) >= 0 ) {
			return next
		}

		class( next? : string ) {
			return this.value(
				next && $mol_tree2.struct( next ) || undefined
			).type
		}

		bind( next? : string ) {
			return this.value(
				next && this.value().clone([ $mol_tree2.struct( next ) ]) || undefined
			).kids[0].type
		}

		value_bool( next? : string ) {
			return this.value(
				next && $mol_tree2.struct( String( next ) ) || undefined
			).type
		}

		value_number( next? : string ) {
			return Number( this.value(
				next && $mol_tree2.struct( String( next ) ) || undefined
			).type )
		}

		value_string( next? : string ) {
			let next2
			if( next !== undefined ) {
				next2 = $mol_tree2.data( next )
				if( this.type() === 'locale' ) next2 = $mol_tree2.struct( '@', [ next2 ] )
			}
			return this.value( next2 ).value
		}

		pairs() {
			return [ ... this.value().kids.map( pair => this.Prop([ ... this.path() , pair.type , null ]) ) , this.Add_pair() ]
		}

		overs() {
			return [ ... this.value().kids.map( over => this.Prop([ ... this.path() , over.type , null ]) ) , this.Add_over() ]
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
			return [ ... this.value().kids.map( ( item , index )=> this.Prop([ ... this.path() , index ]) ) , this.Add() ]
		}

		prop_path( path : $mol_tree2_path ) {
			return path
		}

		add_item( type? : string ) {
			if( !type ) return ''
			
			const items = this.value()
			this.Prop([ ... this.path() , items.kids.length ]).type( type )

			return ''
		}

		over_options() {
			return this.props( this.class() ).kids.map( item => item.type )
		}

		add_over( name? : string ) {
			if( !name ) return ''
			
			this.value( this.value().insert( $mol_tree2.struct( name ), name ) )
			return ''
		}

		add_pair( event? : Event ) {
			if( !event ) return ''
			
			const name = this.add_pair_key()
			this.add_pair_key( '' )
			this.value( this.value().insert( $mol_tree2.data('') , name , null ) )
			
			return ''
		}

		event_prop_add( event? : Event ) {
			const name = this.Bind().filter_pattern()
			this.prop_add( name )
			this.Bind().value( name )
			this.Bind().filter_pattern( '' )
		}

	}

}
