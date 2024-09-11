/* eslint-disable no-console */
export const logger = {
  error: (...message: unknown[]) => {
    console.error('\x1b[31m', ...message, '\x1b[0m')
  },
  info: (...message: unknown[]) => {
    console.log(...message)
  },
  whisper: (...message: unknown[]) => {
    console.log('\x1b[90m', ...message, '\x1b[0m')
  },
  success: (...message: unknown[]) => {
    console.log('\x1b[32m', ...message, '\x1b[0m')
  }
}
