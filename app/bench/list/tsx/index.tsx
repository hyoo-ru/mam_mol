/* @jsx $mol_dom_jsx */
namespace $ {

	export class $mol_app_bench_list_tsx {
	
		static data = {
			sample : '' ,
			items : [] as {
				id : number
				title : string
				content : string
			}[]
		}
		
		static selected = Number.NaN
		
		static onClick( id : number , event : MouseEvent ) {
			this.selected = id
			this.render()
		}

		static render() {

			let Item = ( { id , title , content } : {
				id : number
				title : string
				content : string
			} )=> (
				<div
					classList={[ `list-item list-item-selected-${ this.selected === id }` ]}
					onclick={ this.onClick.bind( this , id ) }
					>
					<div
						id="title"
						classList={[ "list-item-title" ]}
						>
						{ title }
					</div>
					<div
						id="content"
						classList={[ "list-item-content" ]}
						>
						{ content }
					</div>
				</div>
			)

			let List = ( { id } : { id : string } )=> (
				<div classList={[ 'list' ]} >
					{ ... this.data.items.map( item => <Item { ... item } /> ) }
				</div>
			)

			return <List id="list" />
			
		}
		
	}
}
