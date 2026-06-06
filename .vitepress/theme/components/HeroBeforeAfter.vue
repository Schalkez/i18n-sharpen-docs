<template>
  <div class="inspector-window">
    <div class="inspector-sidebar">
      <div class="sidebar-header">DIAGNOSTICS</div>
      <button 
        class="diag-btn" 
        :class="{ active: activeDiag === 'missing', fixed: isFixed }"
        @mouseover="activeDiag = 'missing'"
        @mouseleave="activeDiag = null"
      >
        <span class="status-indicator" :class="{ error: !isFixed, ok: isFixed }"></span>
        Missing Keys
      </button>
      <button 
        class="diag-btn" 
        :class="{ active: activeDiag === 'unused', fixed: isFixed }"
        @mouseover="activeDiag = 'unused'"
        @mouseleave="activeDiag = null"
      >
        <span class="status-indicator" :class="{ warn: !isFixed, ok: isFixed }"></span>
        Unused Keys
      </button>
      <button 
        class="diag-btn" 
        :class="{ active: activeDiag === 'hardcoded', fixed: isFixed }"
        @mouseover="activeDiag = 'hardcoded'"
        @mouseleave="activeDiag = null"
      >
        <span class="status-indicator" :class="{ warn: !isFixed, ok: isFixed }"></span>
        Hardcoded
      </button>

      <div class="action-panel">
        <button class="run-btn" :class="{ ran: isFixed }" @click="isFixed = !isFixed">
          <span class="icon">⚡</span> {{ isFixed ? 'Revert Changes' : 'Run i18n-sharpen' }}
        </button>
      </div>
    </div>

    <div class="inspector-code">
      <div class="window-header">
        <div class="mac-dots">
          <span class="dot close"></span>
          <span class="dot minimize"></span>
          <span class="dot maximize"></span>
        </div>
        <div class="filename">workspace</div>
      </div>
      
      <div class="code-container">
        <!-- JSON File -->
        <div class="file-block">
          <div class="file-name">// locale/en.json</div>
          <pre><code>{
  <span class="key">"nav.home"</span>: <span class="string">"Home"</span><span v-if="!isFixed">,</span><span v-else></span>
  <span v-if="!isFixed" class="diag-target unused" :class="{ highlight: activeDiag === 'unused' }"><span class="key">"old.key"</span>: <span class="string">"I am obsolete"</span></span><span v-if="isFixed" class="diag-target added" :class="{ highlight: activeDiag === 'missing' }"><span class="key">"nav.pricing"</span>: <span class="string">"Pricing"</span></span><span v-if="isFixed">,</span>
  <span v-if="isFixed" class="diag-target added" :class="{ highlight: activeDiag === 'hardcoded' }"><span class="key">"btn.submit"</span>: <span class="string">"Submit"</span></span>
}</code></pre>
        </div>

        <!-- Vue File -->
        <div class="file-block">
          <div class="file-name">// App.vue</div>
          <pre><code>&lt;template&gt;
  &lt;nav&gt;
    &lt;!-- <span v-if="!isFixed" class="comment">Hardcoded text</span><span v-else class="comment">Linted</span> --&gt;
    <span v-if="!isFixed" class="diag-target hardcoded" :class="{ highlight: activeDiag === 'hardcoded' }">&lt;button&gt;Submit&lt;/button&gt;</span><span v-else class="diag-target fixed" :class="{ highlight: activeDiag === 'hardcoded' }">&lt;button&gt;&#123;&#123; $t('btn.submit') &#125;&#125;&lt;/button&gt;</span>
    
    &lt;!-- <span v-if="!isFixed" class="comment">Missing translation</span><span v-else class="comment">Synced</span> --&gt;
    &lt;p&gt;&#123;&#123; $t(<span class="string diag-target" :class="{ 'missing': !isFixed, 'highlight': activeDiag === 'missing' && !isFixed }">'nav.pricing'</span>) &#125;&#125;&lt;/p&gt;
  &lt;/nav&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeDiag = ref(null)
const isFixed = ref(false)
</script>

<style scoped>
.inspector-window {
  display: flex;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  width: 100%;
  max-width: 580px;
  margin: 0 0 0 auto;
  color: var(--vp-c-text-1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.inspector-window:hover {
  transform: translateY(-2px);
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 640px) {
  .inspector-window {
    flex-direction: column;
    margin: 0 auto;
  }
}

.inspector-sidebar {
  width: 180px;
  background: var(--vp-c-bg-soft);
  border-right: 1px solid var(--vp-c-border);
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
}

@media (max-width: 640px) {
  .inspector-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-border);
    padding: 12px;
  }
}

.sidebar-header {
  font-size: 11px;
  font-weight: 700;
  color: var(--vp-c-text-2);
  letter-spacing: 0.05em;
  margin-bottom: 12px;
  padding-left: 8px;
}

.diag-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px;
  margin-bottom: 4px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}

.diag-btn:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.diag-btn.active {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-border);
}

.diag-btn.fixed {
  opacity: 0.6;
}
.diag-btn.fixed:hover {
  opacity: 1;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 10px;
  background: var(--vp-c-text-3);
}

.status-indicator.error { background: var(--vp-c-red-1); box-shadow: 0 0 8px rgba(239, 68, 68, 0.4); }
.status-indicator.warn { background: var(--vp-c-yellow-1); box-shadow: 0 0 8px rgba(245, 158, 11, 0.4); }
.status-indicator.ok { background: var(--vp-c-green-1); box-shadow: 0 0 8px rgba(16, 185, 129, 0.4); }

.action-panel {
  margin-top: auto;
  padding-top: 16px;
}

@media (max-width: 640px) {
  .action-panel {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--vp-c-border);
  }
}

.run-btn {
  width: 100%;
  padding: 10px;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: filter 0.2s, transform 0.1s;
}

.run-btn:hover {
  filter: brightness(1.1);
}

.run-btn:active {
  transform: scale(0.98);
}

.run-btn.ran {
  background: var(--vp-c-text-3);
}

.inspector-code {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.window-header {
  display: flex;
  align-items: center;
  background: var(--vp-c-bg-soft);
  padding: 10px 16px;
  border-bottom: 1px solid var(--vp-c-border);
}

.mac-dots {
  display: flex;
  gap: 8px;
}

.mac-dots .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.close { background: #ff5f56; }
.dot.minimize { background: #ffbd2e; }
.dot.maximize { background: #27c93f; }

.filename {
  margin-left: auto;
  margin-right: auto;
  color: var(--vp-c-text-3);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  transform: translateX(-18px); /* Offset to center relative to the whole header */
}

.code-container {
  padding: 16px;
  flex: 1;
  overflow-y: auto;
  background: var(--vp-c-bg-alt);
}

.file-block {
  margin-bottom: 20px;
}

.file-block:last-child {
  margin-bottom: 0;
}

.file-name {
  color: var(--vp-c-text-2);
  font-size: 12px;
  margin-bottom: 8px;
}

pre {
  margin: 0;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.comment { color: var(--vp-c-text-3); }
.string { color: var(--vp-c-green-1); }
.key { color: var(--vp-c-blue-1); }

/* Interactive Diagnostic Highlights */
.diag-target {
  transition: all 0.2s ease;
  border-radius: 3px;
  padding: 0 2px;
}

.diag-target.highlight {
  background: var(--vp-c-bg-mute);
}

/* Missing */
.missing {
  text-decoration: underline wavy var(--vp-c-red-1);
}
.missing.highlight {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-red-1);
}

/* Unused */
.unused {
  opacity: 0.5;
  text-decoration: line-through;
}
.unused.highlight {
  opacity: 1;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-yellow-1);
}

/* Hardcoded */
.hardcoded {
  border-bottom: 2px dashed var(--vp-c-yellow-1);
}
.hardcoded.highlight {
  background: var(--vp-c-bg-soft);
}

/* Fixed states */
.added {
  color: var(--vp-c-green-1);
  font-weight: 600;
  background: var(--vp-c-bg-soft);
}
.fixed {
  color: var(--vp-c-green-1);
}
</style>
