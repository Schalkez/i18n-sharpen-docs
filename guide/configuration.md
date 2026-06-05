# Configuration Reference

`i18n-sharpen` can be configured using an `i18n-sharpen.json` file in your root workspace directory, or via an `"i18nSharpen"` field in your `package.json`.

---

## Configuration Schema

Here is a full list of available options:

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `scanDirs` | `string[]` | `["src"]` | Folders to scan for translation keys. |
| `localesDir` | `string` | `"src/locales"` | Directory containing your locale files. |
| `defaultLanguage` | `string` | `"en"` | The fallback language. |
| `supportedLanguages` | `string[]` | `["en"]` | List of all supported languages. |
| `excludeDirs` | `string[]` | *See below* | Folders ignored during scanning. |
| `fileExtensions` | `string[]` | *See below* | File extensions to check. |
| `matchFunctions` | `string[]` | `["t", "getTranslation"]` | Function names used for translation in code. |
| `matchAttributes` | `string[]` | `["i18nKey", "id"]` | HTML/JSX attributes scanned for translation keys. |
| `outputReport` | `string` | `"i18n-coverage.md"` | Path to write markdown quality report (`""` to disable). |
| `localesLayout` | `"flat" \| "namespaced"` | `"flat"` | Locale directory layout under `localesDir`. |
| `defaultNamespace` | `string` | `"common"` | Namespace used for keys without a prefix (`namespaced` layout only). |
| `prune.force` | `boolean` | `false` | Make `prune` write by default without `--force` flag. |
| `prune.cleanEmpty` | `boolean` | `false` | Delete empty namespace files after pruning. |
| `looseKeyMatch` | `boolean` | `false` | If `true`, quoted matches of keys in raw code count as "used". |
| `ignoreKeys` | `string[]` | `[]` | Glob patterns (e.g. `status.*`) to ignore during scans/prunes. |
| `ignoreDynamicKeys` | `string[]` | `[]` | Glob prefixes to suppress from dynamic-key warnings. |
| `pluralSuffixes` | `string[]` | *See below* | Plural suffixes to automatically match and preserve. |
| `sortKeys` | `"alpha" \| "source" \| "preserve"` | `"preserve"` | Ordering of keys on writes. |
| `hardcoded.attributes` | `string[]` | *See below* | HTML/JSX attributes scanned for hardcoded strings. |
| `hardcoded.ignore` | `string[]` | `[]` | Hardcoded text strings/regex patterns to ignore. |

---

## Default Values

### Default Excluded Directories (`excludeDirs`)
```json
[
  "node_modules",
  "dist",
  ".git",
  ".next",
  "build",
  "coverage",
  ".agent",
  ".claude"
]
```

### Default Extensions Scanned (`fileExtensions`)
```json
[".ts", ".tsx", ".js", ".jsx", ".vue", ".svelte", ".astro"]
```

### Default Plural Suffixes (`pluralSuffixes`)
Used to avoid false-positive warnings for plural keys. If `key` is used in code, suffixes of `key` are automatically marked as used.
```json
["_zero", "_one", "_two", "_few", "_many", "_other", "_male", "_female"]
```

### Default Hardcoded Attributes Scanned (`hardcoded.attributes`)
```json
["placeholder", "label", "title", "alt", "aria-label"]
```
