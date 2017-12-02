# $mol_chat

GitHub based comments.

**Proof of concept, do not use it**

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_chat)

## Repository preparing

Create issue label like `$mol_chat:example.com` but with your domain. New issues will be created for every unique `link`.

## Usage example

```
<= Chat $mol_chat
	repository_name \nin-jin/mol_chat
	title <= title -
	link <= chat_link \
```

## Properties

**`repository_name() : string`**

GitHub repository full repository name like `user/repo`.

**`repository() : $mol_github_repository`**

Instance of GitHub repository model.

**`title() : string`**

Title for issue that will be created for comments.

**`link() : string`**

Permanent link to page where comments are displayed. Used for identity of issues.

