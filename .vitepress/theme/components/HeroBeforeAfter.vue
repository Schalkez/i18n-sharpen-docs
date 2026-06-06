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
          <span class="icon">⚡</span> {{ isFixed ? 'REVERT CHANGES' : 'RUN I18N-SHARPEN' }}
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
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.2);
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
  font-size: 13px;
  width: 100%;
  max-width: 640px;
  margin: -48px 0 0 auto;
  color: var(--vp-c-text-1);
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s;
}

.inspector-window:hover {
  transform: translateY(-4px);
  box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.3);
}

@media (max-width: 640px) {
  .inspector-window {
    flex-direction: column;
    margin: 0 auto;
  }
}

.inspector-sidebar {
  width: 240px;
  background: var(--vp-c-bg-soft);
  border-right: 1px solid var(--vp-c-border);
  display: flex;
  flex-direction: column;
  padding: 24px;
}

@media (max-width: 640px) {
  .inspector-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-border);
    padding: 20px;
  }
}

.sidebar-header {
  font-size: 11px;
  font-weight: 700;
  color: var(--vp-c-text-2);
  letter-spacing: 0.15em;
  margin-bottom: 16px;
  padding-left: 4px;
}

.diag-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 8px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}

.diag-btn:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.diag-btn.active {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-border);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
}

.diag-btn.fixed {
  opacity: 0.5;
}
.diag-btn.fixed:hover {
  opacity: 0.8;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 12px;
  background: var(--vp-c-text-3);
  box-shadow: 0 0 0 rgba(0,0,0,0);
  transition: box-shadow 0.3s ease;
}

.diag-btn.active .status-indicator.error { background: var(--vp-c-red-1); box-shadow: 0 0 12px var(--vp-c-red-1); }
.diag-btn.active .status-indicator.warn { background: var(--vp-c-yellow-1); box-shadow: 0 0 12px var(--vp-c-yellow-1); }
.diag-btn.active .status-indicator.ok { background: var(--vp-c-green-1); box-shadow: 0 0 12px var(--vp-c-green-1); }

.status-indicator.error { background: var(--vp-c-red-1); }
.status-indicator.warn { background: var(--vp-c-yellow-1); }
.status-indicator.ok { background: var(--vp-c-green-1); }

.action-panel {
  margin-top: auto;
  padding-top: 24px;
}

@media (max-width: 640px) {
  .action-panel {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--vp-c-border);
  }
}

.run-btn {
  width: 100%;
  padding: 12px;
  background: transparent;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 0 0 rgba(0,0,0,0);
}

.run-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  box-shadow: 0 0 15px rgba(var(--vp-c-brand-1), 0.3); /* Glowing edge */
}

.run-btn:active {
  transform: scale(0.98);
}

.run-btn.ran {
  border-color: var(--vp-c-text-3);
  color: var(--vp-c-text-3);
  box-shadow: none;
}
.run-btn.ran:hover {
  border-color: var(--vp-c-text-1);
  color: var(--vp-c-text-1);
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
  padding: 12px 20px;
  border-bottom: 1px solid var(--vp-c-border);
}

.mac-dots {
  display: flex;
  gap: 8px;
  opacity: 0.4;
  transition: opacity 0.3s;
}

.window-header:hover .mac-dots {
  opacity: 1;
}

.mac-dots .dot {
  width: 10px;
  height: 10px;
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
  padding: 24px;
  flex: 1;
  overflow-y: auto;
  background-color: var(--vp-c-bg-alt);
  background-image: radial-gradient(var(--vp-c-border) 1px, transparent 1px);
  background-size: 16px 16px;
}

.file-block {
  margin-bottom: 24px;
  background: var(--vp-c-bg-alt);
  padding: 16px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-border);
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
}

.file-block:last-child {
  margin-bottom: 0;
}

.file-name {
  color: var(--vp-c-text-2);
  font-size: 11px;
  margin-bottom: 12px;
  letter-spacing: 0.05em;
  font-weight: 600;
}

pre {
  margin: 0;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.comment { color: var(--vp-c-text-3); font-style: italic; }
.string { color: var(--vp-c-green-1); }
.key { color: var(--vp-c-blue-1); }

/* Interactive Diagnostic Highlights */
.diag-target {
  transition: all 0.2s ease;
  border-radius: 3px;
  padding: 0 4px;
  margin: 0 -4px;
}

.diag-target.highlight {
  background: var(--vp-c-bg-mute);
  box-shadow: 0 0 0 1px var(--vp-c-border);
}

/* Missing */
.missing {
  text-decoration: underline wavy var(--vp-c-red-1);
  text-underline-offset: 3px;
}
.missing.highlight {
  background: rgba(239, 68, 68, 0.1);
  color: var(--vp-c-red-1);
  box-shadow: 0 0 0 1px var(--vp-c-red-1);
}

/* Unused */
.unused {
  opacity: 0.5;
  text-decoration: line-through;
}
.unused.highlight {
  opacity: 1;
  background: rgba(245, 158, 11, 0.1);
  color: var(--vp-c-yellow-1);
  box-shadow: 0 0 0 1px var(--vp-c-yellow-1);
}

/* Hardcoded */
.hardcoded {
  border-bottom: 2px dashed var(--vp-c-yellow-1);
}
.hardcoded.highlight {
  background: rgba(245, 158, 11, 0.1);
  box-shadow: 0 0 0 1px var(--vp-c-yellow-1);
}

/* Fixed states */
.added {
  color: var(--vp-c-green-1);
  font-weight: 600;
  background: rgba(16, 185, 129, 0.1);
}
.fixed {
  color: var(--vp-c-green-1);
}
</style>
