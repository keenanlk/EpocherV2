# ElectroVite, React apps with Electron & ViteJS

A prebuilt project for creating desktop apps using Electron, React, ViteJS with blazing fast hot-reload, easy to use custom import aliases & executable builds for distribution.

<br />

<p align="center">
<img src="assets/electrovite-round.png" width="200" />
</p>

<h3 align="center"><a href="https://github.com/guasam/electrovite-react">ElectroVite + React</a></h3>

<br />

## Features

- 🌟 Electron
- ⚛️ ReactJS
- ⚡ ViteJS
- 🌀 TypeScript or JavaScript
- 🎨 CSS / SASS / SCSS
- 📸 Images
- 🆎 Fonts
- 🧹 ESLint
- 📦 Electron Forge
- 🧩 Custom Aliases for imports
- 🔥 React Fast Refresh
- 🎁 Package Bundling (Distribution / Release)
- 🔦 Easy Directory Structure
- ⚡ Blazing Fast Hot Reload from ViteJS
- 🤖 Native Node Modules Support
- 👍🏼 Dedicated Vite Configurations

<br />

## Custom aliases to import Components, Styles & Assets.

Ready to use aliases for importing modules, assets, stylesheets etc.

Example:

```ts
// import App from './src/renderer/components/App'
import App from '$components/App';

// import './src/renderer/styles/app.scss'
import '$styles/app.scss';
```

**Available Aliases:**

| Alias         | Target Path                 |
| ------------- | --------------------------- |
| `$src`        | `./src`                     |
| `$assets`     | `./assets`                  |
| `$main`       | `./src/main`                |
| `$renderer`   | `./src/renderer`            |
| `$components` | `./src/renderer/components` |
| `$styles`     | `./src/renderer/styles`     |

<br />

## Installation

Clone the repository:

```bash
git clone https://github.com/guasam/electrovite-react
```

Install package dependencies using [pnpm](https://pnpm.io/) or [yarn](https://www.npmjs.com/package/yarn) or [npm](https://www.npmjs.com/) :

```bash
# using yarn
yarn install

# or using pnpm
pnpm install

# or using npm
npm install
```

If you notice any errors when using `pnpm` package manager for this project, try to remove existing `node_modules` directory and install the pacakges using :

```bash
pnpm i --shamefully-hoist
```