import { colord, type RgbaColor } from 'colord'

import { logStep } from './cli'
import { type ItermTheme, ITERM_TO_VSC_COLOR_MAP, writeItermTheme } from './iterm'
import { readVscTheme } from './vsc'

export async function convertVscTheme(vscThemePath: string) {
  const vscTheme = await readVscTheme(vscThemePath)

  logStep(`Converting theme '${vscTheme.name}'`)

  const itermTheme = {} as ItermTheme

  for (const [itermColorName, vscColorName] of Object.entries(ITERM_TO_VSC_COLOR_MAP) as [keyof ItermTheme, string][]) {
    const color = vscTheme.colors[vscColorName]

    if (!color) {
      throw new Error(`Could not find color for '${itermColorName}' with the '${vscColorName}' identifier.`)
    }

    itermTheme[itermColorName] = vscColorToItermColor(color)
  }

  return writeItermTheme(itermTheme, `themes/${vscTheme.name}.itermcolors`)
}

function vscColorToItermColor(vscColor: string): RgbaColor {
  const color = colord(vscColor)

  return {
    r: color.rgba.r / 255,
    g: color.rgba.g / 255,
    b: color.rgba.b / 255,
    a: color.rgba.a,
  }
}
