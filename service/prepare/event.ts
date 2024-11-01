namespace $ {
	export interface $mol_service_prepare_event {
		preventDefault(): void
		prompt(): Promise<unknown>
		platforms: readonly string[]
		userChoise: Promise<{
			outcome: 'accepted' | 'dismissed'
		}>
	}
}
