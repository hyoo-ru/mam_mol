namespace $ {
	const sourcemap_codec = $node['sourcemap-codec']
	const path = $node.path

	type SourceMapLine = ReturnType<typeof sourcemap_codec.decode>[0]
	type SourceMapSegment = SourceMapLine[0]

	export interface $mol_sourcemap_raw {
		version: number
		sources: string[]
		names: string[]
		sourceRoot?: string
		sourcesContent?: (string|null)[]
		mappings: string
		file: string
	}

	function $mol_sourcemap_file(file: string) {
		return file.replace(/\\/g, '/');
	}

	export const $mol_sourcemap_separator = {
		js: '\n;\n',
		default: '\n',
	}

	export class $mol_sourcemap_builder extends $mol_object2 {
		file: string
		version: number = 3

		separator: string

		protected sourceRoot: string

		protected separator_count: number

		constructor( init? : ( obj : any )=> void ) {
			super(init)
			this.file = $mol_sourcemap_file(this.file)
			const dir = path.dirname(this.file)
			this.sourceRoot = dir && dir !== '.' ? (dir + '/') : ''
			if (!this.separator || this.separator[this.separator.length - 1] !== '\n') this.separator += '\n'
			this.separator_count = this.separator.split('\n').length - 2
		}

		protected chunks: string[] = []
		protected segment_lines: SourceMapLine[] = []
		
		protected sources: string[] = []
		protected source_indexes: Map<string, number> = new Map()

		protected names: string[] = []
		protected name_indexes: Map<string, number> = new Map()
		protected sourceContent: (null|string)[] = []
		get content() {
			return this.chunks.join('')
		}

		get sourcemap(): $mol_sourcemap_raw {
			return {
				version: this.version,
				sources: this.sources,
				names: this.names,
				sourceRoot: this.sourceRoot || undefined,
				mappings: sourcemap_codec.encode(this.segment_lines),
				file: this.file,
				sourcesContent: this.sourceContent,
			}
		}

		toJSON() {
			return this.sourcemap
		}

		toString() {
			return JSON.stringify(this.toJSON())
		}

		protected add_chunk(content: string) {
			const {segment_lines, chunks, separator_count} = this
			if (chunks.length !== 0) {
				chunks.push(this.separator)
				for (let i = 0; i < separator_count; i++) segment_lines.push([])	
			}
			chunks.push(content)
		}

		protected add_content(content: string, file?: string) {
			const {source_indexes, sources, segment_lines} = this
			this.add_chunk(content)
			let sourceIndex: number
			if (file) {
				file = $mol_sourcemap_file(file)
				sourceIndex = source_indexes.get(file)
				if (sourceIndex === undefined) {
					sourceIndex = sources.length
					sources.push(file)
					source_indexes.set(file, sourceIndex)
					this.sourceContent.push(null)
				}
			}

			// let pos = 0
			// let originalLine = 0
			// do {
			// 	if (!file) segment_lines.push([])
			// 	else segment_lines.push([
			// 		[
			// 			0,
			// 			sourceIndex,
			// 			originalLine,
			// 			0,
			// 		] as SourceMapSegment
			// 	] as SourceMapLine)
			// 	originalLine++
			// 	pos = content.indexOf('\n', ++pos)
			// } while (pos !== -1)

			const linesCount = content.split('\n').length
			for (let originalLine = 0; originalLine < linesCount; originalLine++) {
				if (!file) segment_lines.push([])
				else segment_lines.push([
					[
						0,
						sourceIndex,
						originalLine,
						0,
					] as SourceMapSegment
				] as SourceMapLine)
			}
		}

		add(content: string, file?: string, raw?: $mol_sourcemap_raw | string) {
			const {name_indexes, names, source_indexes, sources, segment_lines} = this
			const bundleSourceRoot = this.sourceRoot
			if (!content) throw new Error(`No content: ${file}, ${raw}`)
			if (typeof raw === 'string') raw = JSON.parse(raw) as $mol_sourcemap_raw
			if (!raw || !raw.mappings || raw.mappings.length === 0) {
				this.add_content(content, file)
				return
			}
			this.add_chunk(content)

			let sourceRoot = file ? path.dirname(file) : (raw.sourceRoot || '')
			if (sourceRoot === '.') sourceRoot = ''
			else if (sourceRoot) sourceRoot += '/'
			const lines = sourcemap_codec.decode(raw.mappings)
			for (let line of lines) {
				const mergedLine: SourceMapLine = []
				for (let segment of line) {
					const mergedSegment: SourceMapSegment = [segment[0]] // generatedColumn

					if (segment.length > 1) {
						const [, sourceIndex] = segment
						const source = bundleSourceRoot + sourceRoot + raw.sources[sourceIndex]
						let mergedSourceIndex = source_indexes.get(source)
						if (mergedSourceIndex === undefined) {
							mergedSourceIndex = sources.length
							source_indexes.set(source, mergedSourceIndex)
							sources.push(source)
							if (raw.sourcesContent)
								this.sourceContent.push(raw.sourcesContent[sourceIndex])
						}
						mergedSegment.push(mergedSourceIndex)
					}

					if (segment.length > 2) mergedSegment.push(segment[2]) // originalLine

					if (segment.length > 3) mergedSegment.push(segment[3]) // originalColumn

					if (segment.length > 4) {
						const nameIndex = segment[4]
						const name = raw.names[nameIndex]
						let mergedNameIndex = name_indexes.get(name)
						if (mergedNameIndex === undefined) {
							mergedNameIndex = names.length
							name_indexes.set(name, mergedNameIndex)
							names.push(name)
						}
						mergedSegment.push(mergedNameIndex)
					}

					mergedLine.push(mergedSegment)
				}
				segment_lines.push(mergedLine)
			}

			const lineCount = content.split('\n').length
			for (let i = lines.length; i < lineCount; i++) {
				segment_lines.push([])
			}
			// let pos = 0
			// let count = lines.length
			// do {
			// 	if (--count < 0) segment_lines.push([])
			// 	pos = content.indexOf('\n', ++pos)
			// } while (pos !== -1)
		}
	}
}
