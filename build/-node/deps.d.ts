interface $node {
 	"jsdom" : typeof import( "jsdom" ) // mol/dom/context/context.node.ts
	"child_process" : typeof import( "child_process" ) // mol/build/server/server.node.ts
	"path" : typeof import( "path" ) // mol/server/server.node.ts
	"util" : typeof import( "util" ) // mol/charset/encode/encode.ts
	"fs" : typeof import( "fs" ) // mol/build/build.node.ts
	"chokidar" : typeof import( "chokidar" ) // mol/file/file.node.ts
	"os" : typeof import( "os" ) // mol/server/server.node.ts
	"sourcemap-codec" : typeof import( "sourcemap-codec" ) // mol/sourcemap/builder/builder.ts
	"typescript" : typeof import( "typescript" ) // mol/build/build.node.ts
	"express" : typeof import( "express" ) // mol/build/server/server.node.ts
	"http" : typeof import( "http" ) // mol/server/server.node.ts
	"ws" : typeof import( "ws" ) // mol/build/server/server.node.ts
	"compression" : typeof import( "compression" ) // mol/server/server.node.ts
	"cors" : typeof import( "cors" ) // mol/server/server.node.ts
	"body-parser" : typeof import( "body-parser" ) // mol/server/server.node.ts
	"serve-index" : typeof import( "serve-index" ) // mol/server/server.node.ts
	"readline" : typeof import( "readline" ) // mol/build/server/server.node.ts
}