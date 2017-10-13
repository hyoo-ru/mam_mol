# $mol_form

Form, that contains form fields and action buttons.

## Usage example

```
<= Login $mol_form
   	form_fields /
   		<= Name_field $mol_form_field
   			name <= name_label @ \User name
   			errors <= name_errors /
   			control <= name_control $mol_string
   				value?val <=> name?val \
   		<= pass_field $mol_form_field
   			name < pass_label @ \Pass word
   			errors < pass_errors /
   			control < pass_control $mol_string
   				value?val <=> pass?val \
   				type \password
   	buttons /
   		<= Login_submit $mol_button_major
   			title <= login_submit_label @ \Submit
   			event_click?val <=> event_submit?val null
```

## Properties of $mol_form

**`form_fields(): $mol_form_field[]`**  

Returns list of `$mol_form_field` components.

**`buttons(): []`**  

Returns buttons to interact with the form.

## Properties of $mol_form_field

**`name() : string`**

Returns name of field.

**`errors() : string[]`**

Returns list of errors.

**`control() : $mol_view`**

Returns control to interact with user.
