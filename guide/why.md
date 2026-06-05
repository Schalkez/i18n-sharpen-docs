# Why i18n-sharpen?

Most localization tools rely on simple text search (such as regular expressions or `grep`) to find translation key usages in code. While simple, this approach fails in real-world application codebases.

Here is why `i18n-sharpen` uses **AST-based static analysis** instead of text matches.

---

## The Limitations of grep/Regex

Text-matching tools match character sequences without understanding code logic. This results in:

1. **False Positives**: Mentioning a key inside JSDoc, comments, debug logs, or code variables looks "used" to grep, causing unused keys to remain in locale files forever.
2. **False Negatives on Dynamic Keys**: If you write `t("errors." + code)`, grep fails to find this reference, leading to incorrect warnings about missing/unused keys.
3. **Framework Directives**: Frameworks like Vue, Svelte, and Astro have dynamic directive templates (such as `v-t="'my-key'"` or custom attributes). Text search misses these entirely.

---

## Comparison: AST vs. grep

| Capability | grep-based tools | i18n-sharpen (AST) |
|---|:---:|:---:|
| Detect missing / unused keys | ⚠️ Basic | ✅ Complete & Accurate |
| Template literals (e.g. `` t(`auth.${action}`) ``) | ❌ Misses | ✅ Detected as dynamic prefix |
| Hardcoded string scans | ❌ N/A | ✅ Supported (`--check-hardcoded`) |
| Frameworks (Vue/Svelte/Astro directives) | ❌ Misses | ✅ Native parsing support |
| Safe file writes (Atomic Transactions) | ❌ N/A | ✅ Yes (Write-then-rename) |
| Collision and Pollution protection | ❌ N/A | ✅ Yes (`__proto__` filters) |

---

## How AST Analysis Works

`i18n-sharpen` loads the actual compilers of your project (e.g. `typescript`, `@vue/compiler-sfc`, `svelte`, `@astrojs/compiler`) dynamically to build an **Abstract Syntax Tree (AST)**. 

The tool then traverses the tree nodes to locate exact function calls (like `t()`) and structural attributes, ensuring that every result is compiler-accurate.
