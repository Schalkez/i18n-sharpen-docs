# CLI Reference

`i18n-sharpen` exposes three primary commands: `validate`, `extract`, and `prune`. 

---

## Global Options

The following flags can be passed to any command:

*   `-c, --config <path>`: Specify a custom path to your configuration file (defaults to `i18n-sharpen.json`).
*   `-d, --cwd <path>`: Set a custom working directory (defaults to `process.cwd()`).

---

## Commands

### `validate`

Validates translation keys, active placeholder keys, and cross-locale alignment.

```bash
npx i18n-sharpen validate [options]
```

#### Options:
*   `--check-hardcoded`: Scan source files for un-translated hardcoded strings in HTML text nodes or configured attributes (e.g. `placeholder`, `label`).
    *   **CI Behavior**: If any hardcoded strings are found, the CLI will output them and exit with code `1` so your CI build fails.

---

### `extract`

Scans your codebase for translation references (e.g. `t("key")`) and automatically adds any missing keys to all JSON/YAML translation files.

```bash
npx i18n-sharpen extract [options]
```

#### Options:
*   `--sort <mode>`: Override key sorting mode for output files. Choose from:
    *   `alpha`: Alphabetical sorting.
    *   `source`: Sorted by first-appearance order in source files.
    *   `preserve`: Keep current file order.

---

### `prune`

Cleans up unused translation keys from your locale files. By default, it runs in **dry-run** mode (only prints what it *would* remove).

```bash
npx i18n-sharpen prune [options]
```

#### Options:
*   `--dry-run`: Preview only — never write to files (default).
*   `--force`: Actually write the pruned changes to disk.
*   `--sort <mode>`: Override key sorting mode (see `extract` options).
*   `--clean-empty`: Delete namespace files that are left with zero keys (namespaced layout only).
*   `--interactive`: Launches an interactive terminal-based TUI picker to select which keys to prune. (Requires TTY/interactive shell, falls back to dry-run in CI).

---

### `translate`

Interactively translates missing or placeholder keys in your locale files via a terminal-based command prompt.

```bash
npx i18n-sharpen translate
```

#### Features:
*   **Context-Aware Hints**: Displays inline context comments extracted next to the translation calls (e.g., `// @context: Describe key` or `// @i18n-context: Describe key`) to assist translators.
*   **Reference Values**: Shows the default language translation for comparison when translating other supported languages.
*   **Auto-Save on Interrupt**: Press `Ctrl+C` or send `SIGINT` to exit the session at any time; your progress is automatically saved to disk before exit.
