/// <reference lib="webworker" />
namespace $ {
	export class $mol_worker_service_plugin extends $mol_object {
		static attach_to< This extends typeof $mol_worker_service_plugin >(
			this : This,
			worker = $mol_worker_service,
			config?: Partial< InstanceType< This > >,
		) {
			const plugin = new this
			if (config) {
				for( let key in config ) ( plugin as any )[ key ] = config[ key ]!
			}

			worker.attach(plugin)

			return plugin as InstanceType< This >
		}

		defaults() { return {} }

		id = this.toString()

		@ $mol_mem
		data_actual( next?: Partial<ReturnType<typeof this['defaults']>> | null ) {
			return next ?? null
		}

		@ $mol_mem
		data( next?: Partial<ReturnType<typeof this['defaults']>> | null ) {
			return this.data_actual(next) ?? this.defaults() as ReturnType< this['defaults'] >
		}

		value< Field extends keyof NonNullable<ReturnType< this['data'] >> >(
			field: Field,
			value?: NonNullable<ReturnType< this['data'] >>[ Field ] | null,
		) {
			const next = value === undefined ? undefined : { ...this.data(), [ field ]: value }

			return this.data(next)?.[ field as never ] as NonNullable<ReturnType< this['data'] >>[ Field ]
		}

		init(worker: ServiceWorkerGlobalScope) {}

		fetch_event(event: FetchEvent) { return false as void | boolean }
		activate(event: ExtendableEvent) { return false as void | boolean }
		install(event: ExtendableEvent) { return false as void | boolean }
		before_install(event: Event & { prompt?(): void }) { return false as void | boolean }
	}
}
