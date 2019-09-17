namespace $ {
	const sourcemap_codec = $node['sourcemap-codec'] as typeof import ('sourcemap-codec')
	type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
	const path = $node.path as typeof import('path')

	type SourceMapLine = ReturnType<typeof sourcemap_codec.decode>[0]
	type SourceMapSegment = SourceMapLine[0]

	export interface $mol_sourcemap_raw {
		version: number
		sources: string[]
		names: string[]
		sourceRoot?: string
		sourcesContent?: string[]
		mappings: string
		file: string
	}

	function $mol_sourcemap_file(file: string) {
		return file.replace(/\\/g, '/');
	}

	export class $mol_sourcemap_builder extends $mol_object2 {
		file: string
		version: number = 3

		separator = '\n;\n'

		protected sourceRoot: string

		protected separator_count: number

		constructor( init? : ( obj : any )=> void ) {
			super(init)
			this.file = $mol_sourcemap_file(this.file)
			this.sourceRoot = path.dirname(this.file)
			if (!this.separator || this.separator[this.separator.length - 1] !== '\n') this.separator += '\n'
			this.separator_count = this.separator.split('\n').length
		}

		protected chunks: string[] = []
		protected segment_lines: SourceMapLine[] = []
		
		protected sources: string[] = []
		protected source_indexes: Map<string, number> = new Map()

		protected names: string[] = []
		protected name_indexes: Map<string, number> = new Map()

		get content() {
			return this.chunks.join(this.separator)
		}

		get sourcemap(): $mol_sourcemap_raw {
			return {
				version: this.version,
				sources: this.sources,
				names: this.names,
				file: this.file,
				sourceRoot: this.sourceRoot,
				mappings: sourcemap_codec.encode(this.segment_lines)
			}
		}

		toJS() {
			return this.sourcemap
		}

		toJSON() {
			return JSON.stringify(this.toJS())
		}

		add_content(content: string, file?: string) {
			const {chunks, source_indexes, sources, segment_lines} = this
			if (chunks.length !== 0) {
				chunks.push(this.separator)
				for (let i = 0, count = this.separator_count; i < count; i++) segment_lines.push([])
			}
			chunks.push(content)

			if (!file) return

			file = $mol_sourcemap_file(file)

			let sourceIndex = source_indexes.get(file)
			if (sourceIndex === undefined) {
				sourceIndex = sources.length
				sources.push(file)
				source_indexes.set(file, sourceIndex)
			}

			let pos = 0
			let originalLine = 0
			do {
				++originalLine
				segment_lines.push([
					[
						0,
						sourceIndex,
						originalLine,
						0,
					] as SourceMapSegment
				] as SourceMapLine)
				pos = content.indexOf('\n', ++pos)
			} while (pos !== -1)
		}

		add_sourcemap(raw: $mol_sourcemap_raw | string, sourceRoot?: string) {
			if (!(raw instanceof Object)) raw = JSON.parse(raw) as $mol_sourcemap_raw
			if (!raw.mappings || !raw.mappings.length) return
			if (sourceRoot === undefined) sourceRoot = raw.sourceRoot || ''
			const bundleSourceRoot = this.sourceRoot
			const {name_indexes, names, source_indexes, sources} = this

			const lines = sourcemap_codec.decode(raw.mappings)
			for (let line of lines) {
				const mergedLine: SourceMapLine = []
				for (let segment of line) {
					const mergedSegment: SourceMapSegment = [segment[0]] // generatedColumn

					if (segment.length > 1) {
						const [, sourceIndex] = segment
						const source = path.relative(bundleSourceRoot, path.join(sourceRoot, raw.sources[sourceIndex]))
						let mergedSourceIndex = source_indexes.get(source)
						if (mergedSourceIndex === undefined) {
							mergedSourceIndex = sources.length
							source_indexes.set(source, mergedSourceIndex)
							sources.push(source)
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
				this.segment_lines.push(mergedLine)
			}
		}

		static file(file: string): $mol_sourcemap_builder {
			return new $mol_sourcemap_builder(init => { init.file = file })
		}
	}
}
