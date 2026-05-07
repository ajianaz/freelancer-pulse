/**
 * Freelancer Pulse — Upwork Parser
 * v0.0.1 — Extracts job data from Upwork job detail pages
 */

import { BaseParser } from './base-parser';
import type { ParserResult } from '$lib/types';

export class UpworkParser extends BaseParser {
  canParse(url: string): boolean {
    return /upwork\.com/i.test(url) && (
      /\/nx\/find-work/i.test(url) ||
      /\/nx\/search\/jobs/i.test(url) ||
      /\/jobs\//i.test(url)
    );
  }

  extract(): ParserResult {
    const url = this.getCurrentUrl();
    return {
      platform: 'upwork',
      title: this.extractTitle() ?? 'Untitled Job',
      url,
      budgetRaw: this.extractBudgetRaw() ?? undefined,
      budgetMin: this.extractBudgetMin(),
      budgetMax: this.extractBudgetMax(),
      budgetType: this.extractBudgetType(),
      clientName: this.extractClientName() ?? undefined,
      postedDate: this.extractPostedDate() ?? undefined,
      description: this.extractDescription() ?? undefined,
      tags: this.extractTags(),
    };
  }

  private extractTitle(): string | null {
    return this.extractText([
      // Job detail page
      'h1.heading',
      'h1[class*="job-title"]',
      'h1',
      '[data-test="job-title"]',
      // Search results page (first result)
      '.job-tile-title a',
      'article[data-ev-label="search_results_impression"] h2 a',
      '.job-tile-title',
    ]);
  }

  private extractBudgetRaw(): string | null {
    return this.extractText([
      '[data-test="job-amount"]',
      '[data-test="budget"]',
      '.job-amount',
      '.js-budget',
      '[class*="budget"]',
      '[class*="amount"]',
    ]);
  }

  private extractBudgetMin(): number | undefined {
    const raw = this.extractBudgetRaw();
    if (!raw) return undefined;
    const match = raw.replace(/,/g, '').match(/\$(\d+)/);
    return match ? parseInt(match[1]) : undefined;
  }

  private extractBudgetMax(): number | undefined {
    const raw = this.extractBudgetRaw();
    if (!raw) return undefined;
    const matches = raw.replace(/,/g, '').match(/\$(\d+)/g);
    if (matches && matches.length > 1) {
      return parseInt(matches[1].replace('$', ''));
    }
    return undefined;
  }

  private extractBudgetType(): 'fixed' | 'hourly' | 'unknown' | undefined {
    const raw = this.extractBudgetRaw();
    if (!raw) return undefined;
    if (/hourly|\/hr/i.test(raw)) return 'hourly';
    if (/\$/.test(raw)) return 'fixed';
    return 'unknown';
  }

  private extractClientName(): string | null {
    return this.extractText([
      '[data-test="client-info"]',
      '[data-test="client-info"] a',
      '[data-test="publisher-name"]',
      '.client-name',
      '[class*="client"] [class*="name"]',
    ]);
  }

  private extractPostedDate(): string | null {
    return this.extractText([
      '[data-test="job-posted-date"]',
      '[data-test="posted-on"]',
      '.js-posted',
      '[class*="posted"]',
    ]);
  }

  private extractDescription(): string | null {
    // Description is often longer — try to get full text
    const el = this.querySelector([
      '[data-test="job-description-text"]',
      '.job-description',
      '[class*="description"]',
      '.up-card-section p',
    ]);
    if (!el) return null;
    const text = el.textContent?.trim() ?? null;
    if (text && text.length > 500) return text.substring(0, 500);
    return text;
  }

  private extractTags(): string[] {
    return this.extractAllText([
      '[data-test="job-traits"] span',
      '[data-test="skill"] span',
      '.js-skills span',
      '.o-tag-skill span',
      '[class*="skill"] span',
    ]);
  }
}
