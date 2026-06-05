# Programmatic API

`i18n-sharpen` can be imported and executed programmatically inside your Node.js scripts or build pipelines.

---

## Import Reference

You can import core functions, type definitions, and error classes:

```typescript
import {
  loadConfig,
  validate,
  extract,
  prune,
  I18nSharpenError,
  type I18nSharpenConfig,
  type ValidationResults,
  type PruneResult
} from 'i18n-sharpen'
```

---

## Usage Example

Here is a full integration script:

```typescript
import { loadConfig, validate, extract, prune, I18nSharpenError } from 'i18n-sharpen'

async function run() {
  const cwd = process.cwd()
  
  // 1. Load config from default path or custom path
  const config = loadConfig(cwd)
  
  try {
    // 2. Validate translation keys
    console.log('Validating localization files...')
    const results = await validate(config, cwd, { checkHardcoded: true })
    console.log(`Utilization rate: ${results.utilizationPercent}%`)
    console.log(`Code key coverage: ${results.codeKeyCoverage}%`)
    
    // Check if there are errors (missing keys, etc.)
    const hasErrors = results.missingKeys.length > 0 || results.keysOnlyInLanguages.length > 0
    if (hasErrors) {
      console.warn('i18n validation failed! Extracting missing keys...')
      
      // 3. Extract missing keys automatically
      await extract(config, cwd)
      console.log('Missing keys extracted successfully.')
    }
    
    // 4. Prune unused keys (dry-run preview)
    console.log('Checking for unused keys...')
    const prunePreview = await prune(config, cwd, { dryRun: true })
    console.log(`Found ${prunePreview.totalPruned} unused keys.`)
    
  } catch (error) {
    if (error instanceof I18nSharpenError) {
      console.error(`[${error.error.kind}] Error: ${error.message}`)
      if (error.error.path) {
        console.error(`File path: ${error.error.path}`)
      }
    } else {
      console.error('Fatal error:', error)
    }
    process.exitCode = 1
  }
}

run()
```
