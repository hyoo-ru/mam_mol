# $mol_harp_reply

Description of HARP reply.

## HTTP Negotiation

- [Tree](https://github.com/nin-jin/tree.d): `Accept: application/x-tree;harp`
- [JSON](https://www.w3.org/XML/): `Accept: application/json`
- [XML](https://www.json.org/json-en.html): `Accept: application/xml` (default)

## Model

- Reply is slice of graph which matches to query.
- Reply is normalized.
- Data represents in 4 levels: `type:string` / `id:string` / `field:string` / `value:any`.
- Each entity have surrogate `id` which is unique for type. Combination of `type` and `id` is global unique.
- Link to entity is global unique relative URI like `type=id`.
- Relations is always list of URI's.

### Representations

#### harp.tree

```tree
_query
	\pullRequest[_num=20&30;state=closed,merged;+repository[name;private;owner[name];_len[issue]];-updateTime;author[name]]
		reply
			pullRequest=first
			pullRequest=second
pullRequest
	\first
		_num 0
		state closed
		repository repo=mol
		author user=jin
		updateTime 2022-07-22
	\second
		_num 1
		state merged
		repository repo=mol
		author user=jin
		updateTime 2022-07-21
repo
	\mol
		name \mol
		private false
		owner user=jin
		_len issue 100500
user
	\jin
		name \Jin
```

#### harp.json

```json
{
	"_query": {
		"pullRequest[_num=20&30;state=closed,merged;+repository[name;private;owner[name];_len[issue]];-updateTime;author[name]]": {
			"reply": [ "pullRequest=first", "pullRequest=second" ]
		},
	},
	"pullRequest": {
		"first": {
			"_num": 0,
			"state": "closed",
			"repository": [ "repo=mol" ],
			"author": [ "user=jin" ],
			"updateTime": "2022-07-22",
		},
		"second": {
			"_num": 1,
			"state": "merged",
			"repository": [ "repo=mol" ],
			"author": [ "user=jin" ],
			"updateTime": "2022-07-21",
		},	
	},
	"repo": {
		"mol": {
			"name": "mol",
			"private": false,
			"owner": [ "user=jin" ],
			"_len": {
				"issue": 100500,
			},
		},
	},
	"user": {
		"jin": {
			"name": "Jin",
		},
	},
}
```

#### harp.xml

Attached XSLT makes UI to view data in comfortable way.

```xml
<?xml-stylesheet type="text/xsl" href="https://harp.hyoo.ru/view.xsl"?>
<slice xmlns="https://harp.hyoo.ru">
	<_query id="pullRequest[_num=20&amp;30;state=closed,merged;+repository[name;private;owner[name];_len[issue]];-updateTime;author[name]]">
		<reply>pullRequest=first</reply>
		<reply>pullRequest=first</reply>
	</_query>
	<pullRequest id="pullRequest=first">
		<_num>0</_num>
		<state>closed</state>
		<repository>repo=mol</repository>
		<author>user=jin</author>
		<updateTime>2022-07-22</updateTime>
	</pullRequest>
	<pullRequest id="pullRequest=second">
		<_num>1</_num>
		<state>merged</state>
		<repository>repo=mol</repository>
		<author>user=jin</author>
		<updateTime>2022-07-21</updateTime>
	</pullRequest>
	<repo id="repo=mol">
		<name>mol</name>
		<private>false</private>
		<owner>user=jin</owner>
		<_len query="issue">100500</_len>
	</repo>
	<user id="user=jin">
		<name>Jin</name>
	</user>
</slice>
```

