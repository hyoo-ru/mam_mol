interface $node {
 	"child_process" : typeof import( "child_process" ) // mol/run/run.node.ts
	"path" : typeof import( "path" ) // mol/file/file.node.ts
	"jsdom" : typeof import( "jsdom" ) // mol/dom/context/context.node.ts
	"fs" : typeof import( "fs" ) // mol/file/file.node.ts
	"node:stream" : typeof import( "node:stream" ) // mol/file/file.node.ts
	"os" : typeof import( "os" ) // mol/state/local/local.node.ts
}