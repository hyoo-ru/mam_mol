interface $node {
 	"jsdom" : typeof import( "jsdom" ) // mol/dom/context/context.node.ts
	"child_process" : typeof import( "child_process" ) // mol/run/run.node.ts
	"path" : typeof import( "path" ) // mol/file/file.node.ts
	"util" : typeof import( "util" ) // mol/charset/encode/encode.ts
	"fs" : typeof import( "fs" ) // mol/file/file.node.ts
	"chokidar" : typeof import( "chokidar" ) // mol/file/file.node.ts
	"os" : typeof import( "os" ) // mol/state/local/local.node.ts
	"buffer" : typeof import( "buffer" ) // mol/blob/blob.ts
	"undici" : typeof import( "undici" ) // mol/fetch/fetch.ts
}