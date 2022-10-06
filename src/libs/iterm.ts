import fs from 'node:fs/promises'

import { type RgbaColor } from 'colord'

export const ITERM_TO_VSC_COLOR_MAP = {
  'Ansi 0 Color': 'terminal.ansiBlack',
  'Ansi 1 Color': 'terminal.ansiRed',
  'Ansi 2 Color': 'terminal.ansiGreen',
  'Ansi 3 Color': 'terminal.ansiYellow',
  'Ansi 4 Color': 'terminal.ansiBlue',
  'Ansi 5 Color': 'terminal.ansiMagenta',
  'Ansi 6 Color': 'terminal.ansiCyan',
  'Ansi 7 Color': 'terminal.ansiWhite',
  'Ansi 8 Color': 'terminal.ansiBrightBlack',
  'Ansi 9 Color': 'terminal.ansiBrightRed',
  'Ansi 10 Color': 'terminal.ansiBrightGreen',
  'Ansi 11 Color': 'terminal.ansiBrightYellow',
  'Ansi 12 Color': 'terminal.ansiBrightBlue',
  'Ansi 13 Color': 'terminal.ansiBrightMagenta',
  'Ansi 14 Color': 'terminal.ansiBrightCyan',
  'Ansi 15 Color': 'terminal.ansiBrightWhite',
  'Background Color': 'editor.background',
  'Cursor Color': 'terminal.foreground',
  'Cursor Text Color': 'editor.background',
  'Foreground Color': 'terminal.foreground',
  'Link Color': 'textLink.foreground',
  'Selected Text Color': 'editor.background',
  'Selection Color': 'textLink.foreground',
}

export function writeItermTheme(theme: ItermTheme, themePath: string) {
  return fs.writeFile(themePath, itermThemeToXml(theme))
}

function itermThemeToXml(itermTheme: ItermTheme) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
${Object.entries(itermTheme)
  .map(
    ([name, color]) => `  <key>${name}</key>
  <dict>
    <key>Alpha Component</key>
    <real>${color.a}</real>
    <key>Blue Component</key>
    <real>${color.b}</real>
    <key>Color Space</key>
    <string>sRGB</string>
    <key>Green Component</key>
    <real>${color.g}</real>
    <key>Red Component</key>
    <real>${color.r}</real>
  </dict>
`
  )
  .join('')}
</dict>
</plist>
`
}

export type ItermTheme = {
  [TKey in keyof typeof ITERM_TO_VSC_COLOR_MAP]: RgbaColor
}
