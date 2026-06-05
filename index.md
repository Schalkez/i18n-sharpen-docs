---
layout: home

hero:
  name: i18n-sharpen
  text: AST-based Static Analysis for Localization
  tagline: Keep your translation keys clean, synchronized, and type-safe — with the accuracy of a compiler, not a grep.
  image:
    src: /icon.svg
    alt: i18n-sharpen
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/Schalkez/i18n-sharpen

features:
  - icon: ⚡️
    title: AST-Based Parsing
    details: Scans codebases using real compilers (TS, Vue, Svelte, Astro) to understand dynamic structures, template literals, and directives.
  - icon: 🔍
    title: Hardcoded Detections
    details: Automatically detects raw hardcoded strings in HTML text nodes or attributes and checks them against configurable ignore lists.
  - icon: 🧹
    title: Interactive Pruner (TUI)
    details: Cleans up unused keys safely. Supports a command-line TUI picker to let you select which keys to keep or discard.
  - icon: 📝
    title: CI Markdown Reports
    details: Generates beautiful coverage and quality reports (`i18n-coverage.md`) that integrate perfectly into your PR comments.
  - icon: 🔒
    title: Safe Writes & Guards
    details: Protects against file corruption via atomic write-then-rename and prevents prototype pollution attacks.
  - icon: 🧩
    title: Zero-Cost Architecture
    details: Lazy-loads framework compilers dynamically. Extremely lightweight package with zero bundled bloat.
---
