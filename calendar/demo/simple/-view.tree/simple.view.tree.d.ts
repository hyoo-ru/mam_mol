declare namespace $ {

	type $mol_calendar__month_moment__XRETVOPZ = $mol_type_enforce<
		ReturnType< $mol_calendar_demo_simple['today'] >
		,
		ReturnType< $mol_calendar['month_moment'] >
	>
	export class $mol_calendar_demo_simple extends $mol_example_small {
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
		today( ): $mol_time_moment
		Calendar( ): $mol_calendar
	}
	
}

//# sourceMappingURL=simple.view.tree.d.ts.map