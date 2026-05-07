/**
 * Freelancer Pulse — Content Script Entry
 * v0.0.1 — URL detection, parser routing, clip button injection
 */

import { UpworkParser } from './parsers/upwork-parser';
import { FiverrParser } from './parsers/fiverr-parser';
import { detectPlatform } from '$lib/utils';
import type { BaseParser } from './parsers/base-parser';

const parsers: BaseParser[] = [new UpworkParser(), new FiverrParser()];

/** Find the parser that can handle the current page */
function getParser(): BaseParser | null {
  const url = window.location.href;
  return parsers.find((p) => p.canParse(url)) ?? null;
}

/** Main entry point */
function init(): void {
  const url = window.location.href;
  const platform = detectPlatform(url);

  if (!platform) {
    console.log('[Freelancer Pulse] Unsupported page — content script not activated');
    return;
  }

  const parser = getParser();
  if (!parser) {
    console.warn(`[Freelancer Pulse] No parser found for ${url}`);
    return;
  }

  console.log(`[Freelancer Pulse] Content script loaded — ${platform}`);

  // Inject floating clip button
  injectClipButton(parser);
}

/** Inject the floating clip button into the page */
function injectClipButton(parser: BaseParser): void {
  // Prevent double injection
  if (document.getElementById('fp-clip-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'fp-clip-btn';
  btn.className = 'fp-clip-btn';
  btn.textContent = '📌 Clip this Job';
  btn.type = 'button';

  // Check if already clipped
  checkAlreadyClipped().then((isClipped) => {
    if (isClipped) {
      btn.textContent = '✓ Already clipped';
      btn.classList.add('fp-clipped');
      btn.disabled = true;
    }
  });

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    btn.textContent = '⏳ Clipping...';

    try {
      const result = parser.extract();

      // Send to background service worker
      const response = await chrome.runtime.sendMessage({
        type: 'CLIP_JOB',
        data: result,
      });

      if (response?.data?.ok) {
        btn.textContent = '✓ Clipped';
        btn.classList.add('fp-clipped');
        showPageToast('✓ Job clipped!', 'success');
      } else {
        const error = response?.data?.error ?? 'Unknown error';
        if (error === 'Already clipped') {
          btn.textContent = '✓ Already clipped';
          btn.classList.add('fp-clipped');
          showPageToast('⚠️ Already clipped', 'warning');
        } else {
          btn.textContent = '✕ Error — try again';
          btn.classList.add('fp-error');
          showPageToast(`✕ ${error}`, 'error');
          // Re-enable after 3s
          setTimeout(() => {
            btn.disabled = false;
            btn.textContent = '📌 Clip this Job';
            btn.classList.remove('fp-error');
          }, 3000);
        }
      }
    } catch (err) {
      btn.textContent = '✕ Error — try again';
      btn.classList.add('fp-error');
      showPageToast('✕ Parsing error. Try again.', 'error');
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = '📌 Clip this Job';
        btn.classList.remove('fp-error');
      }, 3000);
    }
  });

  // Wait for body to be ready, then append
  if (document.body) {
    document.body.appendChild(btn);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(btn);
    });
  }
}

/** Show a temporary toast on the page */
function showPageToast(message: string, type: 'success' | 'warning' | 'error'): void {
  // Remove existing toast
  const existing = document.getElementById('fp-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'fp-toast';
  toast.textContent = message;

  const colors = {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  };

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    padding: '8px 16px',
    borderRadius: '8px',
    color: 'white',
    fontSize: '13px',
    fontWeight: '500',
    backgroundColor: colors[type],
    zIndex: '2147483647',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    transition: 'opacity 0.3s ease',
  });

  document.body.appendChild(toast);

  // Auto-dismiss
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Initialize
init();

/** Check if current URL is already clipped */
async function checkAlreadyClipped(): Promise<boolean> {
  try {
    // Use pathname only to avoid query param mismatches
    const url = window.location.origin + window.location.pathname;
    const fullUrl = window.location.href;
    const response = await chrome.runtime.sendMessage({
      type: 'CHECK_JOB',
      data: { url, fullUrl },
    });
    return response?.data?.exists ?? false;
  } catch {
    return false;
  }
}
