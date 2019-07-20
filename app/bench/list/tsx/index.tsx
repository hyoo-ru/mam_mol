/** @jsx $mol_jsx_make */
namespace $ {

	export class $mol_app_bench_list_tsx_item extends $mol_jsx_view {
		
		title = ''
		content = ''
		selected = false

		onSelect() {}

		render() { return (
			<div
				classList={[ `list-item list-item-selected-${ this.selected }` ]}
				onclick={ ()=> this.onSelect() }
				>
				<div
					id="/title"
					classList={[ 'list-item-title' ]}
					>
					{ this.title }
				</div>
				<div
					id="/content"
					classList={[ 'list-item-content' ]}
					>
					{ this.content }
				</div>
			</div>
		) }

	}

	export class $mol_app_bench_list_tsx extends $mol_jsx_view {

		static render( props : Pick< $mol_app_bench_list_tsx , 'data' | 'selected' > ) {
			return $mol_jsx_attach( $mol_dom_context.document , ()=> <this id="/list" { ...props } /> )
		}

		data = {
			sample : '' ,
			items : [] as {
				id : number
				title : string
				content : string
			}[]	
		}	
		
		selected = Number.NaN
		
		onItemSelect( item : { id : number } ) {
			this.selected = item.id
		}

		render() { return (
			<div classList={[ 'list' ]} >
				{ ... this.data.items.map( item => (
					<$mol_app_bench_list_tsx_item
						id={ '/item:' + item.id }
						title={ item.title }
						content={ item.content }
						selected={ item.id === this.selected }
						onSelect={ ()=> this.onItemSelect( item ) }
					/>
				) ) }
			</div>
		) }

	}

}
