# Supported File Formats

`i18n-sharpen` supports reading and writing localization files in multiple formats to fit any JavaScript/TypeScript codebase.

---

## File Formats Matrix

| Extension | Format | Read | Write (`extract`/`prune`) | Extra Dependency |
|---|---|:---:|:---:|:---:|
| `.json` | JSON | ✅ | ✅ | None |
| `.yaml` / `.yml` | YAML | ✅ | ✅ | None |
| `.js` / `.cjs` | CommonJS | ✅ | ❌ Read-Only | None |
| `.mjs` | ES Module | ✅ | ❌ Read-Only | `jiti` |
| `.ts` / `.tsx` | TypeScript | ✅ | ❌ Read-Only | `jiti` |

---

## Why JS/TS files are Read-Only

If you use `.js`, `.ts`, or `.tsx` files to store your translations (e.g. exporting an object with types or custom helpers), `i18n-sharpen` **refuses to write** to these files during `extract` or `prune`. 

Overwriting JS/TS files using automated serialization would destroy:
- Custom imports or helpers.
- Type annotations (e.g. `satisfies Record<string, string>`).
- Code comments and JSDoc blocks.

**Recommendation:** For full automation (`extract` and `prune`), store your translations in `.json` or `.yaml` files. Modern bundlers (like Vite, Webpack) and TypeScript support direct JSON imports natively with compile-time type-safety:
```typescript
import en from './locales/en.json'
```
*(Make sure to enable `"resolveJsonModule": true` in your `tsconfig.json`)*

---

## TS/ESM Loader (`jiti`)

Reading `.ts`, `.tsx`, and `.mjs` files requires the `jiti` package. Install it in your workspace devDependencies:

```bash
pnpm add -D jiti
# or
npm install -D jiti
```
`i18n-sharpen` will detect and use `jiti` to resolve and parse the module exports at run-time.
