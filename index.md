---
layout: page
pageClass: apple-design-page
title: i18n-sharpen
description: AST-based static analysis for i18n keys, dynamic patterns, and hardcoded strings.
---

<main class="apple-home">
  <section class="apple-band apple-hero">
    <div class="apple-band__inner apple-hero__inner">
      <div class="apple-hero__copy">
        <p class="apple-eyebrow">Static analysis for localization</p>
        <h1>i18n-sharpen</h1>
        <p class="apple-lead">Keep translation keys synchronized, type-safe, and clean with compiler-aware analysis for TS, JS, Vue, Svelte, and Astro.</p>
        <div class="apple-actions" aria-label="Primary actions">
          <a class="apple-button apple-button--primary" href="/guide/getting-started">Get Started</a>
          <a class="apple-button apple-button--secondary" href="/guide/cli">CLI Reference</a>
        </div>
      </div>
      <figure class="apple-product apple-product--icon">
        <img src="/icon.svg" alt="i18n-sharpen icon" />
      </figure>
    </div>
  </section>

  <section class="apple-band apple-band--dark">
    <div class="apple-band__inner apple-split">
      <div class="apple-copy">
        <p class="apple-eyebrow">AST-aware detection</p>
        <h2>Find what grep misses.</h2>
        <p>Real parsers understand template literals, framework files, directives, and dynamic key patterns before they become release noise.</p>
      </div>
      <figure class="apple-product apple-product--terminal" aria-label="Example terminal report">
        <pre><code>$ i18n-sharpen scan
✓ locales synchronized
✓ 84 dynamic patterns resolved
! 7 hardcoded strings found
! 3 unused keys ready to prune</code></pre>
      </figure>
    </div>
  </section>

  <section class="apple-band apple-band--parchment">
    <div class="apple-band__inner apple-stack">
      <div class="apple-copy apple-copy--center">
        <p class="apple-eyebrow">Quality report</p>
        <h2>Every locale, accounted for.</h2>
        <p>Coverage, missing keys, unused keys, and hardcoded strings are grouped into a PR-ready report without adding runtime weight to your app.</p>
      </div>
      <div class="apple-metrics" aria-label="i18n-sharpen report highlights">
        <div>
          <span>6</span>
          <p>frameworks scanned</p>
        </div>
        <div>
          <span>0</span>
          <p>bundled compilers</p>
        </div>
        <div>
          <span>1</span>
          <p>markdown report</p>
        </div>
      </div>
    </div>
  </section>

  <section class="apple-band apple-band--black">
    <div class="apple-band__inner apple-split apple-split--reverse">
      <figure class="apple-product apple-product--report" aria-label="Example markdown report">
        <div class="report-line report-line--strong">i18n coverage</div>
        <div class="report-row"><span>Missing keys</span><strong>2</strong></div>
        <div class="report-row"><span>Unused keys</span><strong>11</strong></div>
        <div class="report-row"><span>Hardcoded strings</span><strong>7</strong></div>
        <div class="report-rule"></div>
        <div class="report-line">Safe writes use atomic rename.</div>
      </figure>
      <div class="apple-copy">
        <p class="apple-eyebrow">Safe writes and guards</p>
        <h2>Clean up keys without gambling on files.</h2>
        <p>The pruner uses atomic write-then-rename behavior and guards against unsafe object paths, so cleanup stays predictable in local runs and CI.</p>
      </div>
    </div>
  </section>

  <section class="apple-band apple-band--light apple-final">
    <div class="apple-band__inner apple-copy apple-copy--center">
      <p class="apple-eyebrow">Start precise</p>
      <h2>Run the analyzer before stale keys ship.</h2>
      <div class="apple-actions apple-actions--center" aria-label="Footer actions">
        <a class="apple-button apple-button--primary" href="/guide/getting-started">Read the guide</a>
        <a class="apple-link" href="https://github.com/Schalkez/i18n-sharpen">View on GitHub</a>
      </div>
    </div>
  </section>
</main>
