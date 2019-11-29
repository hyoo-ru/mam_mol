namespace $ {

	@ $mol_class
	export class $mol_log2 extends $mol_wrapper {

		static current = null as null | $mol_log2

		static wrap< This extends { $ : $mol_ambient_context } , Args extends any[] , Result >( task : ( this : This , ... args : Args )=> Result ) {

			const Inner = this

			const wrapped = function( this : This , ... args : Args ) {
				
				const outer = $mol_log2.current
				const inner = $mol_log2.current = new Inner( this , task.name , args )
				
				try {
					return task.call( this , ... args )
				} finally {
					$mol_log2.current = outer
					inner.flush()
				}

			}

			return wrapped
		}

		constructor(
			readonly host : any ,
			readonly id : string ,
			readonly args : any[] ,
		) {
			super()
			this[ Symbol.toStringTag ] = host ? `${ host }.${ id }` : id
		}

		stream = [] as $mol_log2_line[]
		
		flush() {
			if( this.stream.length === 0 ) return
			console.debug( this )
		}

		info( ... values : any[] ) {
			this.stream.push( new $mol_log2_line( ... $mol_log2.prefix , ... values ) )
		}

		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				... $mol_maybe( this.host ).map( $mol_dev_format_auto ) ,
				'.' ,
				$mol_dev_format_strong( this.id ) ,
				'(',
				... this.args.map( $mol_dev_format_auto ) ,
				') ' ,
				$mol_dev_format_auto( this.stream ) ,
			)
		}

		static info( ... values : any[] ) {
			
			const excludes = $mol_log2.excludes
			if( !excludes ) return
			
			const skip = excludes.some( ( regexp , index )=> {
				return regexp && regexp.test( String( values[ index ] ) ) || false
			} )

			if( skip ) return
			
			if( !$mol_log2.current ) {
				console.warn( new Error( `$mol_log.current is not defined. Wrap entry point to $mol_log!` ) )
				$mol_log2.current = new $mol_log2( null , '$mol_log2_default' , [] )
				console.debug( $mol_log2.current )
			}

			$mol_log2.current.info( ... values )

		}

		/**
		 * Enable all logs
		 * 
		 * 	$mol_log2.excludes = []
		 * 
		 * Exclude all atom logs:
		 * 
		 * 	$mol_log2.excludes = [ , /˸|🠈|⏭|⏯|►|💤|☍|☌|✓|✔|✘|🕱|�/ ]
		 * 
		 * Disable logs:
		 * 
		 * 	$mol_log2.excludes = null
		 */
		static excludes = null as any as null | ( undefined | RegExp )[]

		static prefix = [] as any[]

	}

	export class $mol_log2_indent extends $mol_wrapper {

		static wrap< This extends { $ : $mol_ambient_context } , Args extends any[] , Result >( task : ( this : This , ... args : Args )=> Result ) {

			const Inner = this

			const wrapped = function( this : This , ... args : Args ) {
				try {
					$mol_log2.prefix.push( $mol_log2_token_indent )
					return task.call( this , ... args )
				} finally {
					$mol_log2.prefix.pop()
				}

			}

			return wrapped
		}

	}
	
	@ $mol_class
	export class $mol_log2_table extends $mol_log2 {

		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_strong( `${this}(` ) ,
				... this.args.map( $mol_dev_format_auto ) ,
				$mol_dev_format_strong( `) ` ) ,
			)
		}

		[ $mol_dev_format_body ]() {
			return $mol_dev_format_table( {} , ...this.stream.map( $mol_dev_format_auto ) )
		}

	}

	@ $mol_class
	export class $mol_log2_hidden extends $mol_log2 {

		flush() {}

	}

	@ $mol_class
	export class $mol_log2_line extends Array<any> {

		constructor( ... items : any[] ) {
			super( ... items )
		}

		[ $mol_dev_format_head ]() {
			return $mol_dev_format_tr( {} ,
				... this.map( item => $mol_dev_format_td( {} ,
					$mol_dev_format_auto( item )
				) )
			)
		}

	}

	@ $mol_class
	export class $mol_log2_token extends Array<any> {

		constructor( ... items : any[] ) {
			super( ... items )
		}

		[ $mol_dev_format_head ]() {
			return $mol_dev_format_accent( ... this )
		}

	}

	export let $mol_log2_token_empty = new $mol_log2_token( '' )
	export let $mol_log2_token_indent = new $mol_log2_token( '\t' )

	export let $mol_log2_legend = new $mol_log2_table( null , '$mol_log2_legend' , [] )

	if( !$mol_log2.excludes ) $mol_log2_legend.info( $mol_log2_token_empty , 'Use `$mol_log2.excludes : null | RegExp[]` to toggle logs' )

}
