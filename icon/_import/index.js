const fs = require('fs')
const rimraf = require('rimraf')

const viewLibraryPath = `views`

const iconList = require('@mdi/svg/meta.json')
const mdiPaths = require('@mdi/js')

iconList.sort((a, b) => a.nameRu > b.nameRu ? 1 : a.nameRu < b.nameRu ? -1 : 0)

if (fs.existsSync(viewLibraryPath)) rimraf.sync(viewLibraryPath)
fs.mkdirSync(viewLibraryPath)

let links = ''

function snakeToCamel(s){
  return s.split('-').map(t=>t[0].toUpperCase()+t.substring(1)).join('')
}

for (const icon of iconList) {

  const tokens = icon.name.split('-')
  const path = tokens.slice( 0 , tokens.length )
  const name = tokens[ tokens.length - 1 ]

  for( let i = 0 ; i < path.length ; ++i ) {
    const dir = `${viewLibraryPath}/${path.slice(0,i+1).join('/')}`
    if(!fs.existsSync(dir))fs.mkdirSync(dir)
  }

  links += `$mol_icon_${tokens.join('_')} \\${ [ ... icon.aliases , ... icon.tags ].join( ' ' ) }\n`

  fs.writeFileSync(
    `${viewLibraryPath}/${path.join('/')}/${name}.view.tree`,
    `$mol_icon_${tokens.join('_')} $mol_icon path \\${mdiPaths[`mdi${snakeToCamel(icon.name)}`]}\n`
  )

  fs.writeFileSync( `${viewLibraryPath}/all.view.tree`, links )

}
