namespace $ {
	const sourcemap_codec = $node['sourcemap-codec']
	const path = $node.path

	export class $mol_sourcemap_builder {
		version: number = 3

		protected sourceRoot: string

		protected separator_count: number

		constructor( dir: string, readonly separator = '', readonly file?: string ) {
			this.sourceRoot = dir && dir !== '.' ? (dir + '/') : ''
			this.separator += '\n'
			this.separator_count = separator.split('\n').length - 2
		}

		protected chunks: string[] = []
		protected segment_lines: $mol_sourcemap_line[] = []
		
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
			let sourceIndex: number | undefined
			if (file) {
				sourceIndex = source_indexes.get(file)
				if (sourceIndex === undefined) {
					sourceIndex = sources.length
					sources.push(file)
					source_indexes.set(file, sourceIndex)
					this.sourceContent.push(null)
				}
			}

			const linesCount = content.split('\n').length
			for (let originalLine = 0; originalLine < linesCount; originalLine++) {
				if (!file) segment_lines.push([])
				else segment_lines.push([
					[
						0,
						sourceIndex,
						originalLine,
						0,
					] as $mol_sourcemap_segment
				] as $mol_sourcemap_line)
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
			const lines = typeof raw.mappings === 'string' ? sourcemap_codec.decode(raw.mappings) : raw.mappings
			for (let line of lines) {
				const mergedLine: $mol_sourcemap_line = []
				for (let segment of line) {
					const mergedSegment: $mol_sourcemap_segment = [segment[0]] // generatedColumn

					if (segment.length >= 2) {
						const sourceIndex = segment[1]!
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

					if (segment.length >= 3) mergedSegment.push(segment[2]!) // originalLine

					if (segment.length >= 4) mergedSegment.push(segment[3]!) // originalColumn

					if (segment.length >= 5) {
						const nameIndex = segment[4]!
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
			for (let i = lines.length; i < lineCount; i++) segment_lines.push([])
		}
	}
}
