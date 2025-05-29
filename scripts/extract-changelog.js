import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

try {
  const pkgPath = resolve(__dirname, '../package.json')
  const pkg = JSON.parse(await readFile(pkgPath, 'utf-8'))
  const version = pkg.version

  const changelogPath = resolve(__dirname, '../CHANGELOG.md')
  const content = await readFile(changelogPath, 'utf-8')

  const currentVersion = `v${version}`

  // 匹配当前版本标题，转义所有特殊字符
  const escapedVersion = currentVersion.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(
    `##\\s+${escapedVersion}(.*?)(?=##\\s+v|$)`,
    's',
  )
  const match = content.match(regex)

  if (match) {
    console.log(match[1].trim())
  } else {
    console.log(`Release ${currentVersion}`)
  }
} catch (error) {
  console.error('Error extracting changelog:', error.message)
  console.log('Release notes not available')
  process.exit(0) // Don't fail the workflow
}
