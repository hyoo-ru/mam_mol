namespace $ { $mol_style_attach( "mol/infinite/infinite.view.css",
 "[mol_infinite_before],\n[mol_infinite_after] {\n\toverflow-anchor: none;\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_infinite_after]:where([mol_view_error=\"Promise\"]) {\n\theight: 100vh;\n}\n"
) }