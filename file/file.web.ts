namespace $ {
	
	export class $mol_file_web extends $mol_file_webdav {

		static override base = $mol_dom_context.document?.currentScript
			? new URL( '.' , ($mol_dom_context.document.currentScript as any)['src'] ).toString()
			: ''

		// Вотчер выключен, версия всегда будет одна
		override version() { return '' }
		// Ворнинги подавляем, иначе в каждом приложении, загружающим локали, будет ворнинг
		// override watcher() { return { destructor() {} }}

		protected override info() {
			// Директории не поддерживаются
			try {
				const response = this.fetch({ method: 'HEAD' })
				const headers = response.headers()

				let size = Number(headers.get('Content-Length'))
				if (Number.isNaN(size)) size = 0
	
				const last = headers.get('Last-Modified')
	
				const mtime = last ? new Date(last) : new Date()
	
				return {
					type: 'file',
					size,
					mtime,
					atime: mtime,
					ctime: mtime,
				} as $mol_file_stat

			} catch (error) {
				if (
					error instanceof Error
					&& error.cause instanceof $mol_fetch_response
					&& error.cause.native.status === 404
				) return null

				$mol_fail_hidden(error)
			}

		}
	
	}

	$.$mol_file = $mol_file_web
}
