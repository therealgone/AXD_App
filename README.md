# ⚡ Electron + React + TypeScript + Vite + Tailwind Boilerplate

A modern boilerplate for building cross-platform desktop apps with Electron, React, and TypeScript, leveraging **Vite** for super-fast development and **Tailwind CSS** for rapid UI styling.

---

## ✨ Features

- **Vite + React + TypeScript**
- **Tailwind CSS** — utility-first styling
- **ESLint** (type-aware rules, separate for frontend and main)
- **Electron** — full build pipeline (Windows, macOS, Linux)
- Separate TypeScript configs for Electron main process and React renderer
- **Playwright** (E2E tests) + **Vitest** (unit tests)
- Ready-to-use scripts for development, building, packaging, and testing

---

## 📦 Scripts

```json
{
  "dev": "npm-run-all --parallel dev:react dev:electron",
  "dev:react": "vite",
  "dev:electron": "npm run transpile:electron && cross-env NODE_ENV=development electron .",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "transpile:electron": "tsc --project src/electron/tsconfig.json",
  "dist:mac": "npm run transpile:electron && npm run build && electron-builder --mac --arm64",
  "dist:win": "npm run transpile:electron && npm run build && electron-builder --win --x64",
  "dist:linux": "npm run transpile:electron && npm run build && electron-builder --linux --x64",
  "test:e2e": "playwright test",
  "test:unit": "vitest src"
}
```

---

## 🚀 Getting Started

### 🔥 Start Development

```bash
npm install
npm run dev
```

This will:

- Start the Vite dev server for React (`dev:react`)
- Transpile Electron main process TypeScript (`transpile:electron`)
- Launch the Electron app with React HMR (`dev:electron`)

---

## 📂 Folder Structure

```bash
root/
├── src/
│   ├── electron/    # Electron Main Process (isolated TS config)
│   └── renderer/    # React Frontend (Vite + Tailwind + TS)
├── dist/            # Vite/TypeScript build output
├── public/          # Static assets
├── tsconfig.json    # Root TS config
├── vite.config.ts   # Vite config (frontend)
├── electron-builder.json # Electron packaging config
```

---

## 🧠 ESLint Setup

Uses **@typescript-eslint** for type-aware linting, with separate configs for Electron and React.

### 🔧 Base Config Example

```ts
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

---

### ✅ React-Specific Additions

Install these packages:

- `eslint-plugin-react-x`
- `eslint-plugin-react-dom`

#### Sample Extension:

```ts
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

---

## 🛠 Tech Stack

| Category      | Tools/Technologies                          |
|---------------|---------------------------------------------|
| Frontend      | React, TypeScript, Tailwind CSS, Vite       |
| Main Process  | Electron (TypeScript, separate bundle)      |
| Build Tools   | Vite, Electron Builder, TSC                 |
| Linting       | ESLint (+ TypeScript, React Rules)          |
| Testing       | Playwright (E2E), Vitest (unit)             |
| Packaging     | electron-builder (Win, MacOS, Linux)        |

---

## 🧪 Testing

```bash
npm run test:unit     # Unit tests with Vitest
npm run test:e2e      # End-to-end tests with Playwright
```

---

## 📦 Build for Production

### 🪟 Windows

```bash
npm run dist:win
```

### 🍏 Mac (ARM64)

```bash
npm run dist:mac
```

### 🐧 Linux

```bash
npm run dist:linux
```

> ⚙️ The outputs are ready for distribution, thanks to `electron-builder`.

---

## 💡 Why This Template?

Whenever you want to start a new Electron app with React, Tailwind, and TypeScript, just clone this repo.  
No need to set up separate boilerplates or struggle with build tools, configs, or testing — it’s all here and ready for you to scale.

---

## 🙏 Credits

Made with ❤️ by **Jeevan Baabu Murugan**
