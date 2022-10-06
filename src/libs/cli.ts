import ora from 'ora'

const spinner = ora()

export function logStep(text: string) {
  if (spinner.isSpinning) {
    spinner.succeed()
  }

  spinner.start(text)
}

export function logError(error: unknown) {
  if (spinner.isSpinning) {
    spinner.fail()
  }

  console.error(`\n${error}`)
}

export function stopSpinner() {
  if (spinner.isSpinning) {
    spinner.succeed()
  }
}
