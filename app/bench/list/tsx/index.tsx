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
		
		static onClick( item : { id : number } , event : MouseEvent ) {
			this.selected = item.id
			this.render()
		}

		static render() {
			return (
				<div id="list" className="list">
					{ this.data.items.map( item => (
						<div
							id={ 'list-item#' + item.id }
							className={ `list-item list-item-selected-${ this.selected === item.id }`  }
							onclick={ this.onClick.bind( this , item ) }
							>
							<div
								id={ 'list-item#' + item.id + '-title' }
								className="list-item-title"
								>
								{ item.title }
							</div>
							<div
								id={ 'list-item#' + item.id + '-content' }
								className="list-item-content"
								childNodes={[ item.content ]}
								>
								{ item.content }
							</div>
						</div>
					) ) }
				</div>
			)
		}
		
	}
}
