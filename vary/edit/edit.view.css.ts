namespace $.$$ {
	
	$mol_style_define( $mol_vary_edit, {
		
		Head: {
			background: {
				color: $mol_theme.card,
			},
			box: {
				shadow: [[ 'inset', '0px', '0px', '0px', '1px', $mol_theme.field ]],
			},
		},
		
		Body: {
			display: 'table',
		},
		
		Type: {
			width: '2.5rem',
			Trigger: {
				padding: $mol_gap.text,
			},
			Option_row: {
				padding: $mol_gap.text,
			},
		},
		
		Text: {
			flex: {
				shrink: 1,
			},
		},
		
		Field_add: {
			background: 'none',
			box: {
				shadow: 'none',
			},
		},
		
		Item_expand: {
			Icon: {
				margin: 0,
			},
		},
		
		Item: {
			display: 'table-row',
		},
		
		Item_key: {
			padding: $mol_gap.text,
			// color: $mol_theme.shade,
			justify: {
				content: 'center',
			},
			minWidth: '2.5rem',
			display: 'table-cell',
			verticalAlign: 'top',
		},
		
		Item_val: {
			flex: {
				grow: 1,
			},
			width: `100%`,
			display: 'table-cell',
		},
		
		Item_drag: {
			cursor: 'move',
		},
		
		Type_drop: {
			'[mol_drop_status]': {
				drag: {
					box: {
						shadow: [[ '0px', '1px', '0px', '0px', $mol_theme.focus ]],
					},
				}
			},
		},
		
		Item_drop: {
			'[mol_drop_status]': {
				drag: {
					box: {
						shadow: [[ '0px', '1px', '0px', '0px', $mol_theme.focus ]],
					},
				}
			},
		},
		
	} )
	
}
