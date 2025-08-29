namespace $ {
	
	// Make new tokens: https://github.com/settings/personal-access-tokens/new?name=$mol_github_model&user_models=read
	export const $mol_github_model_keys = [
		'11AADME3A07jh1teLjee8r_O7MKyAF8rbdIlhk4OwsJHaCnh4CjDNxn1nLNAvW2Hy6OSTIYABWQyp0rOHt',
		'11AADME3A0q6w8EFz9G9aa_byqEpTuWUa63PKoSAwN1eVi2GyGJ4SxYhm9OhAc2DCTANK2ULBQpQgUu6D9',
		'11AADME3A0RsfJpmuZfl4r_Nw6G3v7vDgnrqDxmlgF6Gyj9YawDfTqatNUxhwPjzWwYYGIORGETiUtMOmR',
		'11AADME3A0meTYzVZaOtJF_LrdN2tIDycZHDBN3560V3S2ZWpo07uATZON0XUYF2ZFFC3X2OHSwdUcVfUe',
		'11AADME3A0myGzFwrNHkV0_InRujMNsqM7cLUWDvKCW5GRy2waC7fHXuSJdzW0mrwvX7VP4I2MoGXRXF6w',
		'11AADME3A0LF4GM8Qam5xH_LFLHQqgcmudC8eyKLEqc4l5xDPcplSxAcEA3j8BO4MYTAE6FOROqFIuhGfR',
		'11AADME3A0KUqaRrYVSMzf_rYLJd83byQ1HN8KOIzVnHPBvW6VPei911NJgPucm1hRETR55VB3mdyw2ezI',
		'11AADME3A0exOKaaQLYR2b_2JKJDHVAWxoqRPlGcugBHNapcZWT9awRic8iBmgOirXRVC5X7ILtz6KDffv',
		'11AADME3A071WbELDi8THV_v3dkQtbYpSGjUXeWT6dAiPBf5a5b0KDr0E029T6P4CsZOOYO3DPpopBkodL',
		'11AADME3A0L5oFWUKk62fr_Dcbcn1ZcNBwWaLfbHzlgueGcxBEO5FoOieoowhJ6Q1zIWIIYZBG7XI16O4H',
	].map( str => `github_pat_${str}` )
	
	export const $mol_github_model_polyglots = [
		'openai/gpt-4.1-mini', // 150/D
		'openai/gpt-4o-mini', // 150/D
		'openai/gpt-4.1-nano', // 150/D
		'microsoft/Phi-4-mini-instruct', // 150/D
		'openai/gpt-4.1', // 50/D
		'openai/gpt-4o', // 50/D
	]
	
	const System = $mol_data_record({
		role: $mol_data_const( 'system' ),
		content: $mol_data_string,
	})
	
	const Assistant = $mol_data_record({
		role: $mol_data_const( 'assistant' ),
		content: $mol_data_nullable( $mol_data_string ),
		tool_calls: $mol_data_optional( $mol_data_array( $mol_data_record({
			type: $mol_data_const( 'function' ),
			id: $mol_data_string,
			function: $mol_data_record({
				name: $mol_data_string,
				arguments: $mol_data_string,
			}),
		}) ) ),
	})
	
	const User = $mol_data_record({
		role: $mol_data_const( 'user' ),
		content: $mol_data_string,
	})
	
	const Tool = $mol_data_record({
		role: $mol_data_const( 'tool' ),
		// name: $mol_data_string,
		tool_call_id: $mol_data_string,
		content: $mol_data_string,
	})
	
	const Message = $mol_data_variant( Assistant, User, Tool )
	
	const Resp = $mol_data_record({
		choices: $mol_data_array( $mol_data_record({
			message: Assistant,
		}) ),
	})
	
	
	type Primitive< Type extends 'string' | 'number' | 'integer' | 'boolean' > = Readonly<{
		type: Type
		enum?: Type[]
	}>
	
	type Obj< Params extends Record< string, Type > > = Readonly<{
		type: 'object'
		parameters: Params
		required: keyof Params
	}>
	
	type List< Item extends Type > = Readonly<{
		type: 'array'
		items: Item
	}>
	
	type Type = Obj<any> | List<any> | Primitive<any>
	
	
	/**
	 * Github hosted LLM API.
	 */
	export class $mol_github_model extends $mol_object {
		
		// STATIC STATE
		
		/** Model names from https://github.com/marketplace/models */
		@ $mol_memo.method
		names() {
			return this.$.$mol_github_model_polyglots
		}
		
		/** System rules */
		rules() {
			return ''
		}
		
		/** List of callable functions */
		@ $mol_memo.method
		tools() {
			return new Map< string, {
				descr: string
				params: Obj<any>
				func: Function
			} >()
		}
		
		// DYNAMIC STATE
		
		/** Additional model query params */
		@ $mol_mem
		params( next?: {}) {
			$mol_wire_solid()
			return next ?? {}
		}
		
		/** Dialog history */
		@ $mol_mem
		history( next?: typeof Message.Value[] ) {
			$mol_wire_solid()
			return next ?? []
		}
		
		// ACTIONS
		
		/** Independent copy of current state. */
		@ $mol_action
		fork() {
			
			const fork = $mol_github_model.make({
				names: $mol_const( this.names() ),
				rules: $mol_const( this.rules() ),
				tools: $mol_const( this.tools() ),
			})
			
			fork.params( this.params() )
			fork.history( this.history() )
			
			return fork
		}
		
		@ $mol_action
		shot( prompt: any, params?: {} ) {
			const fork = this.fork()
			if( params ) fork.params({ ... this.params(), ... params })
			fork.ask( prompt )
			return fork.response()
		}
		
		/** User prompt */
		@ $mol_action
		ask( text: any ) {
			this.history([
				... this.history(),
				{
					role: "user",
					content: JSON.stringify( text ),
				}
			])
			return this
		}
		
		/** Answer from tool */
		@ $mol_action
		answer( id: string, data: any ) {
			
			const history = this.history()
			
			const index = 1 + history.findIndex( msg => msg.role === 'tool' && msg.tool_call_id === id )
			if( !index ) this.$.$mol_fail( new Error( 'Wrong tool call id', { cause: id } ) )
			
			this.history([
				... history.slice( 0, index ),
				{
					role: "tool",
					tool_call_id: id,
					content: JSON.stringify( data ),
				},
				... history.slice( index ),
			])
			return this
		}
		
		// INFERENCE
		
		@ $mol_mem_key
		request_body( model: string ) {
			return JSON.stringify({
				model,
				stream: false,
				response_format: { type: 'json_object' },
				messages: [
					{ role: 'system', content: this.rules() },
					... this.history(),
				],
				tools: [ ... this.tools() ].map( ([ name, info ])=> ({
					type: "function",
					function: {
						name,
						description: info.descr,
						strict: true,
						parameters: info.params,
					},
				}) ),
				... this.params(),
			})
		}
		
		request( model: string, key: string ) {
			return Resp( this.$.$mol_fetch.json(
				`https://models.github.ai/inference/chat/completions`,
				{
					method: 'POST',
					headers: {
						'Authorization': 'Bearer ' + key,
						'Content-Type': 'application/json',
					},
					body: this.request_body( model )
				}
			) as any )
		}
		
		/** Last response from LLM */
		@ $mol_mem
		response() {
			
			const history = this.history()
			
			const last = history.at(-1)
			if( last?.role !== 'user' ) return null
			
			const models = this.names()
			const keys = this.$.$mol_array_shuffle_sync( $mol_github_model_keys )
			
			for( const model of models ) for( const key of keys ) {
			
				try {
					
					const resp = this.request( model, key )
					const message = resp.choices[0].message
					this.history([ ... history, message ])
					return JSON.parse( message.content ?? 'null' )
				
				} catch( error ) {

					if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
					$mol_fail_log( error )

				}
			
			}
			
			return this.$.$mol_fail( new Error( 'No alive model' ) )
			
		}
		
	}
	
}
