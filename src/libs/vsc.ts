import fs from 'node:fs/promises'

import degit from 'degit'
import fg from 'fast-glob'

import { logStep } from './cli'

const themeGitPath = 'antfu/vscode-theme-vitesse'
const themeDownloadPath = 'dist'

export async function fetchVscThemes(): Promise<string[]> {
  logStep('Downloading themes')

  await fs.rm(themeDownloadPath, { recursive: true, force: true })

  const emitter = degit(themeGitPath, { force: true })

  await emitter.clone(themeDownloadPath)

  const themePaths = await fg(`${themeDownloadPath}/themes/*.json`, { absolute: true, onlyFiles: true })

  if (themePaths.length === 0) {
    throw new Error(`No themes found in '${themeDownloadPath}'.`)
  }

  return themePaths
}

export async function readVscTheme(themePath: string): Promise<VscTheme> {
  return JSON.parse(await fs.readFile(themePath, 'utf8')) as VscTheme
}

interface VscTheme {
  name: string
  colors: Record<string, string>
}
