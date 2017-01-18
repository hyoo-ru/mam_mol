# $mol_form

Component that helps to compose any form.

## Usage example

```
$mol_form
   	form_fields /
   		< loginField $mol_form_field
   			name < loginLabel @ \Login
   			errors < loginErrors /
   			control < loginControl $mol_string value > login \
   		< passwordField $mol_form_field
   			name < passwordLabel @ \Password
   			errors < passwordErrors /
   			control < passControl $mol_string
   				value > password \
   				type \password
```

## Properties

**`form_fields(): Array`**  

Field for `$mol_form_field` components which would be included in the the form

**`buttons(): Array`**  

Buttons to interact with the form.
