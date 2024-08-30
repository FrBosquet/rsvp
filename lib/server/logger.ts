/* eslint-disable no-console */
export const logger = {
  error: (...message: unknown[]) => {
    console.error(...message)
  },
  info: (...message: unknown[]) => {
    console.log(...message)
  }
}
