declare var process : any

process.on( 'uncaughtException' , ( error : Error )=> {
	var stack = $mol_atom.stack
	console.error( error )
	
	$mol_atom_restore( error )
} )
