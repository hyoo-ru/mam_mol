# $mol_message

Draws generic user message

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_message_demo)

## Usage example
```
<= Message $mol_message
	name <= user_name \
	moment <= post_moment $mol_time_moment
	avatar <= avatar_uri \
	avatar_link <= profile_uri \
	text <= post_body \
```

## Properties

**`name() : string`**

User name.

**`moment() : $mol_time_moment`**

Moment of message creating

**`moment_string() : string`**

Moment of message creating as string. By default uses `moment()` with `YYYY-MM-DD hh:mm:ss` pattern.

**`avatar() : string`**

Uri of user avatar

**`avatar_link() : string`**

Uri for navigation on click to avatar.

**`text() : string`**

Message body that interpeted as markdown.
