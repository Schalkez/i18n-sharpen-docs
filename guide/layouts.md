# Locale Layouts

`i18n-sharpen` supports two directory layout strategies under your `localesDir` to organize your translation files.

---

## 1. Flat Layout (Default)

In a flat layout, all translation keys for a given language are stored in a single file named after the language code.

### Structure
```
src/locales/
├── en.json
├── ja.json
└── vi.json
```

### Usage
Keys are referenced directly in your source code:
```typescript
t("auth.login.title")
```

---

## 2. Namespaced Layout

For larger applications, a flat file can become too big. A namespaced layout groups translation keys into separate files (namespaces) inside a language folder.

To enable this, set `localesLayout` in configuration:
```json
{
  "localesLayout": "namespaced"
}
```

### Structure
```
src/locales/
├── en/
│   ├── common.json
│   └── auth.json
├── ja/
│   ├── common.json
│   └── auth.json
└── vi/
    ├── common.json
    └── auth.json
```

### Usage
Keys are referenced by prefixing them with the namespace name and a colon `:`:
```typescript
// Will look for "login.title" inside "auth.json"
t("auth:login.title")

// Will look for "welcome" inside "common.json"
t("common:welcome")
```

### Default Namespace
If you call `t()` without a namespace prefix (e.g. `t("welcome")`), `i18n-sharpen` looks for it in the default namespace file. 

You can customize the default namespace in `i18n-sharpen.json` (defaults to `"common"`):
```json
{
  "localesLayout": "namespaced",
  "defaultNamespace": "main"
}
```
*(With the configuration above, `t("welcome")` is resolved as `main:welcome`)*

---

## 3. Namespace Scoped Hooks (e.g. `next-intl`)

For modern React/Next.js localization libraries like `next-intl` that scope translation functions within a namespace, `i18n-sharpen` automatically detects the namespace and prepends it to all nested translation keys.

### Usage
```typescript
// Detects 'auth' namespace and resolves the key as 'auth.signIn'
const t = useTranslations('auth');
t('signIn'); 

// Destructuring is also fully supported
const { t } = useTranslation('common');
t('cancel'); // Resolves as 'common.cancel'
```

Supported hooks out of the box:
- `useTranslations` (Next-intl)
- `useNamespace`
- `useTranslation` (React-i18next)
