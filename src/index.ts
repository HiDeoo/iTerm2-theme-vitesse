import { logError, stopSpinner } from './libs/cli'
import { convertVscTheme } from './libs/converter'
import { fetchVscThemes } from './libs/vsc'

async function run() {
  try {
    const vscThemePaths = await fetchVscThemes()

    for (const vscThemePath of vscThemePaths) {
      await convertVscTheme(vscThemePath)
    }
  } catch (error) {
    logError(error)
  } finally {
    stopSpinner()
  }
}

run()
