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
		
		static selected = null as number
		
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
					id={ id }
					className={ `list-item list-item-selected-${ this.selected === id }`  }
					onclick={ this.onClick.bind( this , id ) }
					>
					<div
						id={ `${id}.title` }
						className="list-item-title"
						>
						{ title }
					</div>
					<div
						id={ `${id}.content` }
						className="list-item-content"
						>
						{ content }
					</div>
				</div>
			)
			
			return $mol_dom_patch(
				document.getElementById( 'list' ) ,
				<div id="list" className="list">
					{ ... this.data.items.map( item => <Item { ... item } /> ) }
				</div>
			)
			
		}
		
	}
}
