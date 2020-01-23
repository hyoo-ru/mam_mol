namespace $ { $mol_style_attach( "mol/status/status.view.css",
 "[mol_status] {\n\ttext-align: center;\n\tpadding: .5rem;\n\tborder-radius: var(--mol_skin_round);\n\tdisplay: block;\n}\n\n[mol_status]:not([mol_view_error=\"Promise\"]) {\n\tbackground: var(--mol_skin_warn);\n\tcolor: var(--mol_skin_warn_text);\n}\n\n[mol_status]:not([mol_view_error=\"Promise\"]):empty {\n\tdisplay: none;\n}\n"
) }