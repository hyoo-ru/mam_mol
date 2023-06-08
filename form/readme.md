# $mol_form

Form, that contains form fields and action buttons.

## Usage example

```
<= Login $mol_form
   	form_fields /
   		<= Name_field $mol_form_field
   			name <= name_label @ \User name
   			bid <= name_bid \
   			control <= Name_control $mol_string
   				value? <=> name? \
   		<= pass_field $mol_form_field
   			name <= pass_label @ \Pass word
   			bid <= pass_bid \
   			control <= Pass_control $mol_string
   				value? <=> pass? \
   				type \password
   	buttons /
   		<= Login_submit $mol_button_major
   			title <= login_submit_label @ \Submit
   			event_click? <=> event_submit? null
```

## Properties of $mol_form

**`form_fields(): $mol_form_field[]`**  

Returns list of `$mol_form_field` components.

**`buttons(): []`**  

Returns buttons to interact with the form.

## Properties of $mol_form_field

**`name() : string`**

Returns name of field.

**`bid() : string`**

Returns call to action.

**`control() : $mol_view`**

Returns control to interact with user.
