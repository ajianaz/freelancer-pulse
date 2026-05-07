/**
 * Freelancer Pulse — Base Parser
 * v0.0.1 — Abstract parser with multi-selector resilience
 */

import type { ParserResult } from '$lib/types';

/**
 * Abstract base class for platform-specific parsers.
 * Provides selector fallback, element waiting, and safe extraction.
 */
export abstract class BaseParser {
  /** Check if this parser can handle the current page */
  abstract canParse(url: string): boolean;

  /** Extract job data from the current page DOM */
  abstract extract(): ParserResult;

  /**
   * Try multiple selectors in order, return first matching element.
   * Returns null if no selector matches.
   */
  protected querySelector(selectors: string[]): Element | null {
    for (const selector of selectors) {
      try {
        const el = document.querySelector(selector);
        if (el) return el;
      } catch {
        // Invalid selector — skip
      }
    }
    return null;
  }

  /**
   * Try multiple selectors, return textContent of first match.
   * Returns null if nothing found.
   */
  protected extractText(selectors: string[]): string | null {
    const el = this.querySelector(selectors);
    if (!el) return null;
    const text = el.textContent?.trim() ?? null;
    return text && text.length > 0 ? text : null;
  }

  /**
   * Try multiple selectors, return href of first match.
   * Returns null if nothing found.
   */
  protected extractHref(selectors: string[]): string | null {
    const el = this.querySelector(selectors);
    if (!el) return null;
    const href = el.getAttribute('href');
    return href?.trim() ?? null;
  }

  /**
   * Extract all text from multiple matching elements (e.g., skill tags).
   */
  protected extractAllText(selectors: string[]): string[] {
    for (const selector of selectors) {
      try {
        const els = document.querySelectorAll(selector);
        if (els.length > 0) {
          return Array.from(els)
            .map((el) => el.textContent?.trim() ?? '')
            .filter((t) => t.length > 0);
        }
      } catch {
        // Invalid selector — skip
      }
    }
    return [];
  }

  /**
   * Wait for an element to appear in the DOM (for SPA lazy loading).
   * Returns null if timeout is reached.
   */
  protected waitForElement(selector: string, timeoutMs: number = 5000): Promise<Element | null> {
    return new Promise((resolve) => {
      // Check immediately
      const existing = document.querySelector(selector);
      if (existing) {
        resolve(existing);
        return;
      }

      const observer = new MutationObserver(() => {
        const el = document.querySelector(selector);
        if (el) {
          observer.disconnect();
          resolve(el);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      setTimeout(() => {
        observer.disconnect();
        resolve(null);
      }, timeoutMs);
    });
  }

  /**
   * Get current page URL safely.
   */
  protected getCurrentUrl(): string {
    return window.location.href;
  }
}
