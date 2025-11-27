// @ts-nocheck
interface $node {
 	"internal" : typeof import( "internal" ) // node/node.node.ts
	"jsdom" : typeof import( "jsdom" ) // mol/dom/context/context.node.ts
	"child_process" : typeof import( "child_process" ) // mol/run/run.node.ts
	"path" : typeof import( "path" ) // mol/file/file.node.ts
	"fs" : typeof import( "fs" ) // mol/file/file.node.ts
	"node:stream" : typeof import( "node:stream" ) // mol/file/file.node.ts
	"os" : typeof import( "os" ) // mol/state/local/local.node.ts
	"buffer" : typeof import( "buffer" ) // mol/blob/blob.ts
	"crypto" : typeof import( "crypto" ) // mol/crypto/native/native.node.ts
	"web-audio-api" : typeof import( "web-audio-api" ) // mol/audio/context/context.ts
}