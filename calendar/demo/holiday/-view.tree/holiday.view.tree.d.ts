declare namespace $ {

	type $mol_calendar__month_string__JFULKQ54 = $mol_type_enforce<
		ReturnType< $mol_calendar_demo_holiday['month'] >
		,
		ReturnType< $mol_calendar['month_string'] >
	>
	type $mol_calendar__day_holiday__24NOSPTL = $mol_type_enforce<
		ReturnType< $mol_calendar_demo_holiday['holiday'] >
		,
		ReturnType< $mol_calendar['day_holiday'] >
	>
	export class $mol_calendar_demo_holiday extends $mol_example_small {
		title( ): string
		holidays( ): readonly(any)[]
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
		month( ): string
		holiday( id: any): boolean
		Calendar( ): $mol_calendar
	}
	
}

//# sourceMappingURL=holiday.view.tree.d.ts.map