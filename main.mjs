import { chromium } from 'playwright'
import { existsSync, mkdirSync } from 'fs'
import { dirname } from 'path'

const statePath = '.data/state.json'
const browser = await chromium.launch({ headless: false })
const context = await browser.newContext({
  storageState: existsSync(statePath) ? statePath : undefined,
})
const page = await context.newPage()
const saveState = async () => {
  mkdirSync(dirname(statePath), { recursive: true })
  await context.storageState({ path: statePath })
}

Object.assign(global, {
  browser,
  context,
  page,
  statePath,
  saveState,
  importModule: (x) => import(x),
})

process.on('unhandledRejection', (e) => {
  console.error(e)
})

console.log('The browser is ready.')

setInterval(() => {}, 60000)
