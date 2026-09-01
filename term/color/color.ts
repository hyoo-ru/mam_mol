namespace $ {
	
	/** Module for working with terminal. Text coloring when output in terminal */
	export class $mol_term_color {
		
		static reset = this.ansi( 0, 0 )
		static bold = this.ansi( 1, 22 )
		static italic = this.ansi( 3, 23 )
		static underline = this.ansi( 4, 24 )
		static inverse = this.ansi( 7, 27 )
		static hidden = this.ansi( 8, 28 )
		static strike = this.ansi( 9, 29 )
		
		static gray = this.ansi( 90, 39 )
		static red = this.ansi( 91, 39 )
		static green = this.ansi( 92, 39 )
		static yellow = this.ansi( 93, 39 )
		static blue = this.ansi( 94, 39 )
		static magenta = this.ansi( 95, 39 )
		static cyan = this.ansi( 96, 39 )
		
		static Gray = ( str: string )=> this.inverse( this.gray( str ) )
		static Red = ( str: string )=> this.inverse( this.red( str ) )
		static Green = ( str: string )=> this.inverse( this.green( str ) )
		static Yellow = ( str: string )=> this.inverse( this.yellow( str ) )
		static Blue = ( str: string )=> this.inverse( this.blue( str ) )
		static Magenta = ( str: string )=> this.inverse( this.magenta( str ) )
		static Cyan = ( str: string )=> this.inverse( this.cyan( str ) )
		
		static ansi( open: number, close: number ) {
	
			if( typeof process === 'undefined' ) return String
			if( !process.stdout.isTTY ) return String
		
			const prefix = `\x1b[${open}m`
			const postfix = `\x1b[${close}m`
			
			const suffix_regexp = new RegExp( postfix.replace( '[', '\\[' ), 'g' )
		
			return function colorer( str: string ) {
		
				str = String( str )
				if( str === '' ) return str
		
				const suffix = str.replace( suffix_regexp, prefix )
				return prefix + suffix + postfix
		
			}
		
		}
		
	}
	
}
