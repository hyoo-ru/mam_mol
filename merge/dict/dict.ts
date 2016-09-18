function $mol_merge_dict< Target , Source >( target : Target , source : Source ) : Target & Source {
	return (<any>Object).assign( {} , target , source )
}
