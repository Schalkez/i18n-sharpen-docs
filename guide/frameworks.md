# Framework & Library Integration

`i18n-sharpen` utilizes dedicated, per-framework AST compilers to parse and extract translation keys with compiler-level accuracy.

Here is a guide on how different frameworks and libraries are integrated and scanned.

---

## React / Next.js

React projects typically use `react-i18next` or `next-intl`.

### Features
- **Translation Functions**: Scans calls to `t(...)` and `getTranslation(...)` (customizable via `matchFunctions`).
- **JSX Attributes**: Scans JSX props like `i18nKey="..."` and `id="..."` (customizable via `matchAttributes`).
- **Namespace Scoped Hooks**: Automatically tracks local translation variables created by hooks and prepends the namespace to keys (e.g. resolves `t('signIn')` to `auth.signIn`).

### Next-intl & React-i18next Hook Examples
```tsx
import { useTranslations } from 'next-intl';
import { useTranslation } from 'react-i18next';

export function Profile() {
  // 1. next-intl namespace hook
  const tAuth = useTranslations('auth');
  
  // 2. react-i18next namespace hook
  const { t: tCommon } = useTranslation('common');

  return (
    <div>
      {/* Resolves to 'auth.title' */}
      <h1>{tAuth('title')}</h1> 
      
      {/* Resolves to 'common.save' */}
      <button>{tCommon('save')}</button>
    </div>
  );
}
```

---

## Vue

Vue projects typically use `vue-i18n`.

### Features
- **SFC Compiler**: Utilizes `@vue/compiler-sfc` to compile and parse single-file components.
- **Interpolation**: Parses mustache interpolation `{{ $t('key') }}` and `{{ t('key') }}` in Vue templates.
- **Directives**: Fully supports Vue directives like `v-t="'key'"`.
- **Dynamic Bindings**: Scans for bound attributes like `:placeholder="$t('search.placeholder')"`.

### Example
```vue
<template>
  <div>
    <!-- 1. Mustache Interpolation -->
    <p>{{ $t('dashboard.welcome') }}</p>

    <!-- 2. v-t Directive -->
    <span v-t="'auth.login'"></span>

    <!-- 3. Bound Attribute -->
    <input :placeholder="$t('search.placeholder')" />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// Script translation calls are also scanned
console.log(t('app.title'));
</script>
```

---

## Svelte

Svelte projects typically use `svelte-i18n`.

### Features
- **Svelte Compiler**: Uses the native Svelte compiler to parse `.svelte` templates.
- **Store Subscriptions**: Correctly parses Svelte store subscriptions like `{$t('key')}`.
- **Attributes**: Scans for keys inside HTML attribute expressions.

### Example
```html
<script>
  import { t } from 'svelte-i18n';
</script>

<!-- 1. Store Subscription -->
<h1>{$t('home.title')}</h1>

<!-- 2. Attribute Binding -->
<button title={$t('home.button_tooltip')}>
  {$t('home.save')}
</button>
```

---

## Astro

Astro pages use the Astro compiler.

### Features
- **Astro Parser**: Utilizes `@astrojs/compiler` to parse Astro files.
- **Frontmatter & Template**: Scans both frontmatter script tags (`---` blocks) and HTML template regions.

### Example
```astro
---
// Astro frontmatter (scanned as TypeScript/JavaScript)
import { getTranslation } from '../i18n';
const t = getTranslation(Astro.currentLocale);
---

<!-- Astro template (scanned for t(...) calls) -->
<div>
  <h1>{t('welcome')}</h1>
  <img src="/hero.png" alt={t('hero_alt')} />
</div>
```
