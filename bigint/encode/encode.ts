namespace $ {
	
	export function $mol_bigint_encode( num: bigint ) {

		const minus = num < 0n ? 255 : 0;
		num = minus ? -num - 1n : num
		
		const bytes = [] as number[]
		while( num ) {
			
			let byte = minus ^ Number( num % 256n )
			bytes.push( byte )
			
			if( num >>= 8n ) continue
			
			if(( minus & 128 )!==( byte & 128 ))
				bytes.push( minus )
			
			break
			
		}
	
		return new Uint8Array(bytes);
	}
	
}
