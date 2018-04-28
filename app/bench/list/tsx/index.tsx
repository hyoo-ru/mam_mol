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

		static rendering : $mol_fiber

		@ $mol_fiber_method
		static render() {

			$mol_fiber_start( ()=> {
				if( this.rendering ) this.rendering.destructor()
			} )
			
			this.rendering = $mol_fiber.current
			// $mol_fiber.deadline = Number.POSITIVE_INFINITY

			let Item = ( { id , item } : { id : string , item : {
				id : number
				title : string
				content : string
			} } )=> (
				<div
					id={ id }
					className={ `list-item list-item-selected-${ this.selected === item.id }`  }
					onclick={ this.onClick.bind( this , item ) }
					>
					<div
						id={ `${id}.title` }
						className="list-item-title"
						>
						{ item.title }
					</div>
					<div
						id={ `${id}.content` }
						className="list-item-content"
						>
						{ item.content }
					</div>
				</div>
			)

			return (
				<div id="list" className="list">
					{ this.data.items.map( item => <Item id={ `list.item[${item.id}]` } item={ item } /> ) }
				</div>
			)
		}
		
	}
}
