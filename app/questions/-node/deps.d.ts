// @ts-nocheck
interface $node {
 	"internal" : typeof import( "internal" ) // node/node.node.ts
	"autoinstall" : typeof import( "autoinstall" ) // node/node.node.ts
	"child_process" : typeof import( "child_process" ) // mol/run/run.node.ts
	"path" : typeof import( "path" ) // mol/file/file.node.ts
	"jsdom" : typeof import( "jsdom" ) // mol/dom/context/context.node.ts
	"crypto" : typeof import( "crypto" ) // mol/crypto/native/native.node.ts
	"fs" : typeof import( "fs" ) // mol/file/file.node.ts
	"node:stream" : typeof import( "node:stream" ) // mol/file/file.node.ts
	"os" : typeof import( "os" ) // giper/baza/app/home/home.node.ts
	"http" : typeof import( "http" ) // mol/rest/server/server.node.ts
	"stream" : typeof import( "stream" ) // mol/rest/server/server.node.ts
	"buffer" : typeof import( "buffer" ) // mol/blob/blob.ts
}