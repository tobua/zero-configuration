import { Bun } from '../asset/bun'
import { Electron } from '../asset/electron'
import githubActions from '../asset/github-actions.png'
import playwright from '../asset/playwright.svg'
import { React } from '../asset/react'
import rsbuild from '../asset/rsbuild.png'
import { TypeScript } from '../asset/typescript'

export const Stack = () => (
  <footer
    style={{
      display: 'flex',
      justifyContent: 'center',
      gap: 10,
      padding: 20,
    }}
  >
    <Electron width={50} height={50} />
    <img style={{ width: 50, height: 50 }} src={playwright} alt="Playwright" />
    <TypeScript width={50} height={50} />
    <Bun width={50} height={50} />
    <React width={50} height={50} />
    <img style={{ width: 50, height: 50 }} src={rsbuild} alt="Rsbuild" />
    <img style={{ width: 50, height: 50 }} src={githubActions} alt="GitHub Actions" />
  </footer>
)
