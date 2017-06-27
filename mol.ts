declare class WeakMap< Key , Value > {
	delete( key : Key ) : boolean
	get( key : Key ) : Value
	has( key : Key ) : boolean
	set( key : Key , value : Value ) : Map< Key , Value >
}

declare class Map< Key , Value > {
	clear(): void
	delete( key : Key ) : boolean
	forEach< Context = any >( handler : ( this : Context , value : Value , key : Key , map : Map< Key , Value > ) => void , context? : Context ) : void
	get( key : Key ) : Value
	has( key : Key ) : boolean
	set( key : Key , value : Value ) : Map< Key , Value >
	size : number
}

declare class Set< Value > {
	add( value : Value ) : Set< Value >
	clear() : void
	delete( value : Value ) : boolean
	forEach< Context = any >( handler : ( this : Context , value : Value , key : Value , map : Set< Value > ) => void , context? : Context ) : void
	has( value : Value ) : boolean
	size : number
}
