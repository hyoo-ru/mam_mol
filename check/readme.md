# $mol_check

A various type of checkboxes.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_check)

## Usage example

```
<= Spam $mol_check_box
	label / <= spam_label @ \Send me some spam
	checked?val <=> spam_needed?val true
	enabled <= spam_enabled false
```

## Properties

**`checked( next? : boolean ) : boolean`**

Returns checked state of checkbox. User can switch them when checkbox is enabled.

**`enabled() : false`**

Returns tru if checkbox can be switched by user.

## Variants of visualization

- [$mol_check_box]( box ) - simple checkbox
- [$mol_check_expand]( expand ) - expander for hierarchical structures
